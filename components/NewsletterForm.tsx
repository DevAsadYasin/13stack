"use client";

import { useActionState } from "react";
import { newsletter } from "@/lib/mock-data";
import { subscribeNewsletter, type ActionResult } from "@/app/actions/leads";

const initialState: ActionResult | null = null;

export function NewsletterForm() {
  const [state, formAction, pending] = useActionState(
    subscribeNewsletter,
    initialState,
  );

  if (state?.ok) {
    return <p className="text-sm text-text-02">{newsletter.successMessage}</p>;
  }

  return (
    <form action={formAction} className="flex w-full max-w-md flex-col gap-3">
      <input
        name="website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden
      />
      <div className="flex flex-col gap-2 sm:flex-row sm:items-stretch">
        <label htmlFor="newsletter-email" className="sr-only">
          {newsletter.emailLabel}
        </label>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder={newsletter.emailPlaceholder}
          className="w-full flex-1 rounded-full border border-white/15 bg-card-bg px-4 py-2.5 text-sm text-white placeholder:text-text-03 focus:border-primary focus:outline-none"
        />
        <button
          type="submit"
          disabled={pending}
          className="shrink-0 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-white transition-colors hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? newsletter.submittingLabel : newsletter.submitLabel}
        </button>
      </div>
      <label className="flex items-start gap-2.5 text-xs leading-relaxed text-text-03">
        <input
          type="checkbox"
          name="optInSkedvio"
          className="mt-0.5 size-3.5 shrink-0 rounded border-white/20 bg-card-bg text-primary"
        />
        <span>{newsletter.skedvioOptIn}</span>
      </label>
      {state && !state.ok ? (
        <p className="text-xs text-red-400">{state.error}</p>
      ) : null}
    </form>
  );
}
