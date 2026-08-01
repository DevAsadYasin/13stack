"use client";

import { useActionState } from "react";
import { contactPage } from "@/lib/mock-data";
import { submitConsultation, type ActionResult } from "@/app/actions/leads";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";

const inputClasses =
  "w-full rounded-lg border bg-card-bg px-4 py-3 text-sm text-white placeholder:text-text-03 focus:outline-none border-border-01/20 focus:border-primary";

const initialState: ActionResult | null = null;

export function ContactForm() {
  const [state, formAction, pending] = useActionState(
    submitConsultation,
    initialState,
  );

  return (
    <section className="px-gutter py-16">
      <RevealGroup className="items-center gap-8">
        <RevealItem className="w-full max-w-[560px]">
          {state?.ok ? (
            <div className="rounded-lg border border-border-01/20 bg-card-bg p-6 text-center">
              <p className="text-sm text-text-02">
                {contactPage.form.successMessage}
              </p>
              {state.warning ? (
                <p className="mt-2 text-xs leading-relaxed text-amber-300">
                  {state.warning}
                </p>
              ) : null}
            </div>
          ) : (
            <form action={formAction} className="flex flex-col gap-5">
              <input
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden
              />
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm text-text-03">
                  {contactPage.form.nameLabel}
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  autoComplete="name"
                  className={inputClasses}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm text-text-03">
                  {contactPage.form.emailLabel}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className={inputClasses}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="company" className="text-sm text-text-03">
                  {contactPage.form.companyLabel}{" "}
                  <span className="text-text-03/70">
                    ({contactPage.form.companyOptional})
                  </span>
                </label>
                <input
                  id="company"
                  name="company"
                  autoComplete="organization"
                  className={inputClasses}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-sm text-text-03">
                  {contactPage.form.messageLabel}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className={`${inputClasses} resize-none`}
                />
              </div>

              <fieldset className="flex flex-col gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3.5">
                <legend className="px-1 text-[11px] font-medium tracking-wide text-text-03 uppercase">
                  Updates
                </legend>
                <label className="flex items-start gap-3 text-sm leading-relaxed text-text-02">
                  <input
                    type="checkbox"
                    name="optInStudio"
                    className="mt-1 size-4 shrink-0 rounded border-white/20 bg-card-bg text-primary focus:ring-primary"
                  />
                  <span>{contactPage.form.newsletterStudio}</span>
                </label>
                <label className="flex items-start gap-3 text-sm leading-relaxed text-text-02">
                  <input
                    type="checkbox"
                    name="optInSkedvio"
                    className="mt-1 size-4 shrink-0 rounded border-white/20 bg-card-bg text-primary focus:ring-primary"
                  />
                  <span>{contactPage.form.newsletterSkedvio}</span>
                </label>
              </fieldset>

              {state && !state.ok ? (
                <p className="text-sm text-red-400">{state.error}</p>
              ) : null}

              <button
                type="submit"
                disabled={pending}
                className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium tracking-tight text-white transition-colors hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {pending
                  ? contactPage.form.submittingLabel
                  : contactPage.form.submitLabel}
              </button>
              <p className="text-center text-xs text-text-03">
                {contactPage.form.note}
              </p>
            </form>
          )}
        </RevealItem>
      </RevealGroup>
    </section>
  );
}
