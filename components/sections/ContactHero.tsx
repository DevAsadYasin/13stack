import { Mail } from "lucide-react";
import { contactPage } from "@/lib/mock-data";
import { siteConfig } from "@/lib/site";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";

export function ContactHero() {
  return (
    <RevealGroup className="flex flex-col items-start gap-8 text-left lg:max-w-[28rem]">
      <div className="flex flex-col gap-4">
        <RevealItem>
          <p className="text-xs font-medium tracking-wide text-primary uppercase">
            {contactPage.eyebrow}
          </p>
        </RevealItem>
        <RevealItem>
          <h1 className="text-[clamp(2rem,4vw+0.75rem,3rem)] font-medium tracking-tight leading-[1.12]">
            {contactPage.title}
          </h1>
        </RevealItem>
        <RevealItem>
          <p className="max-w-prose text-[0.9375rem] leading-relaxed text-text-03 sm:text-base">
            {contactPage.subtitle}
          </p>
        </RevealItem>
      </div>

      <RevealItem className="flex w-full flex-col gap-4 border-t border-white/10 pt-6">
        <div className="flex flex-col gap-1.5">
          <p className="text-[11px] font-medium tracking-wide text-text-03 uppercase">
            {contactPage.emailLabel}
          </p>
          <a
            href={`mailto:${siteConfig.contactEmail}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-white transition-colors hover:text-primary"
          >
            <Mail size={15} className="text-primary" />
            {siteConfig.contactEmail}
          </a>
        </div>
        <div className="flex flex-col gap-1.5">
          <p className="text-[11px] font-medium tracking-wide text-text-03 uppercase">
            {contactPage.responseLabel}
          </p>
          <p className="text-sm text-white">{contactPage.responseValue}</p>
        </div>
      </RevealItem>

      <RevealItem className="grid w-full gap-5 sm:grid-cols-3 lg:grid-cols-1">
        {contactPage.points.map((point) => (
          <div key={point.label} className="flex flex-col gap-1">
            <p className="text-sm font-medium tracking-tight text-white">
              {point.label}
            </p>
            <p className="text-[13px] leading-relaxed text-text-03">
              {point.detail}
            </p>
          </div>
        ))}
      </RevealItem>
    </RevealGroup>
  );
}
