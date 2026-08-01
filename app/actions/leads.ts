"use server";

import { getSupabaseAdmin } from "@/lib/supabase/admin";

export type ActionResult =
  { ok: true; warning?: string } | { ok: false; error: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CONSULTATION_LIMIT = 3;
const CONSULTATION_WINDOW_MS = 60 * 60 * 1000;

function clean(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim() : "";
}

async function upsertSubscriber(input: {
  email: string;
  source: string;
  optInStudio: boolean;
  optInSkedvio: boolean;
}) {
  const supabase = getSupabaseAdmin();

  const { data: existing } = await supabase
    .from("newsletter_subscribers")
    .select("lists, opt_in_studio, opt_in_skedvio")
    .eq("email", input.email)
    .maybeSingle();

  const lists = new Set<string>(existing?.lists ?? []);
  if (input.optInStudio) lists.add("studio_news");
  if (input.optInSkedvio) lists.add("skedvio_product");

  return supabase.from("newsletter_subscribers").upsert(
    {
      email: input.email,
      source: input.source,
      lists: Array.from(lists),
      opt_in_studio: Boolean(existing?.opt_in_studio) || input.optInStudio,
      opt_in_skedvio: Boolean(existing?.opt_in_skedvio) || input.optInSkedvio,
      consent_at: new Date().toISOString(),
      unsubscribed_at: null,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "email" },
  );
}

export async function submitConsultation(
  _prev: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  if (clean(formData.get("website"))) return { ok: true };

  const name = clean(formData.get("name"));
  const email = clean(formData.get("email")).toLowerCase();
  const company = clean(formData.get("company"));
  const message = clean(formData.get("message"));
  const optInStudio = formData.get("optInStudio") === "on";
  const optInSkedvio = formData.get("optInSkedvio") === "on";

  if (!name) return { ok: false, error: "Name is required." };
  if (!EMAIL_RE.test(email))
    return { ok: false, error: "Enter a valid email." };
  if (!message) return { ok: false, error: "Message is required." };
  if (message.length > 5000) {
    return { ok: false, error: "Message is too long." };
  }

  try {
    const supabase = getSupabaseAdmin();
    const windowStart = new Date(
      Date.now() - CONSULTATION_WINDOW_MS,
    ).toISOString();
    const { count, error: countError } = await supabase
      .from("consultations")
      .select("id", { count: "exact", head: true })
      .eq("email", email)
      .gte("created_at", windowStart);

    if (countError) {
      console.error("consultation rate limit check failed", countError);
      return { ok: false, error: "Could not send your message. Try again." };
    }

    if ((count ?? 0) >= CONSULTATION_LIMIT) {
      return {
        ok: false,
        error: "Too many recent requests. Try again in an hour.",
      };
    }

    const { error } = await supabase.from("consultations").insert({
      name,
      email,
      company: company || null,
      message,
      source: "13stack",
      status: "new",
    });

    if (error) {
      console.error("consultation insert failed", error);
      return { ok: false, error: "Could not send your message. Try again." };
    }

    if (optInStudio || optInSkedvio) {
      const { error: newsletterError } = await upsertSubscriber({
        email,
        source: "13stack",
        optInStudio,
        optInSkedvio,
      });

      if (newsletterError) {
        console.error("consultation newsletter upsert failed", newsletterError);
        return {
          ok: true,
          warning:
            "Your consultation was saved, but newsletter signup failed. You can retry from the footer.",
        };
      }
    }

    return { ok: true };
  } catch (err) {
    console.error("consultation submit failed", err);
    return {
      ok: false,
      error:
        "Consultation form is not configured yet. Check Supabase env vars.",
    };
  }
}

export async function subscribeNewsletter(
  _prev: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  if (clean(formData.get("website"))) return { ok: true };

  const email = clean(formData.get("email")).toLowerCase();
  const optInSkedvio = formData.get("optInSkedvio") === "on";

  if (!EMAIL_RE.test(email))
    return { ok: false, error: "Enter a valid email." };

  try {
    const { error } = await upsertSubscriber({
      email,
      source: "13stack",
      optInStudio: true,
      optInSkedvio,
    });

    if (error) {
      console.error("newsletter upsert failed", error);
      return { ok: false, error: "Could not subscribe. Try again." };
    }

    return { ok: true };
  } catch (err) {
    console.error("newsletter subscribe failed", err);
    return {
      ok: false,
      error: "Newsletter is not configured yet. Check Supabase env vars.",
    };
  }
}
