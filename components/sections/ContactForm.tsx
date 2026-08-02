"use client";

import { useActionState } from "react";
import { contactPage } from "@/lib/mock-data";
import { siteConfig } from "@/lib/site";
import { submitConsultation, type ActionResult } from "@/app/actions/leads";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";

const inputClasses =
  "w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-sm text-white placeholder:text-text-03/80 transition-colors focus:border-primary focus:outline-none";

const initialState: ActionResult | null = null;

export function ContactForm() {
  const [state, formAction, pending] = useActionState(
    submitConsultation,
    initialState,
  );

  return (
    <RevealGroup className="w-full">
      <RevealItem className="w-full">
        {state?.ok ? (
          <div className="flex flex-col items-start gap-3 border-t border-white/10 pt-6 sm:border-t-0 sm:pt-0">
            <p className="text-lg font-medium tracking-tight text-white">
              Message sent
            </p>
            <p className="max-w-md text-sm leading-relaxed text-text-03">
              {contactPage.form.successMessage}
            </p>
            {state.warning ? (
              <p className="max-w-md text-xs leading-relaxed text-amber-300">
                {state.warning}
              </p>
            ) : null}
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="mt-2 text-sm font-medium text-primary transition-colors hover:brightness-110"
            >
              {siteConfig.contactEmail}
            </a>
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

            <div className="grid gap-5 sm:grid-cols-2">
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
                rows={6}
                required
                placeholder={contactPage.form.messagePlaceholder}
                className={`${inputClasses} resize-none`}
              />
            </div>

            <fieldset className="flex flex-col gap-3 border-t border-white/10 pt-5">
              <legend className="mb-1 px-0 text-[11px] font-medium tracking-wide text-text-03 uppercase">
                Updates
              </legend>
              <label className="flex items-start gap-3 text-sm leading-relaxed text-text-02">
                <input
                  type="checkbox"
                  name="optInStudio"
                  className="mt-1 size-4 shrink-0 rounded border-white/20 bg-transparent text-primary focus:ring-primary"
                />
                <span>{contactPage.form.newsletterStudio}</span>
              </label>
              <label className="flex items-start gap-3 text-sm leading-relaxed text-text-02">
                <input
                  type="checkbox"
                  name="optInSkedvio"
                  className="mt-1 size-4 shrink-0 rounded border-white/20 bg-transparent text-primary focus:ring-primary"
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
              className="inline-flex items-center justify-center rounded-full bg-primary px-7 py-3.5 text-sm font-medium tracking-tight text-white transition-colors hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {pending
                ? contactPage.form.submittingLabel
                : contactPage.form.submitLabel}
            </button>

            <p className="text-xs leading-relaxed text-text-03">
              {contactPage.form.note}{" "}
              <a
                href={`mailto:${siteConfig.contactEmail}`}
                className="font-medium text-white transition-colors hover:text-primary"
              >
                {siteConfig.contactEmail}
              </a>
            </p>
          </form>
        )}
      </RevealItem>
    </RevealGroup>
  );
}
