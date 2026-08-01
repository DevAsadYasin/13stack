import { contactPage } from "@/lib/mock-data";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { HeroRule } from "@/components/ui/HeroRule";

export function ContactHero() {
  return (
    <section className="relative overflow-clip px-gutter pt-32 pb-0 sm:pt-40">
      <div
        className="absolute top-1/2 left-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/25 blur-[100px]"
        aria-hidden
      />
      <RevealGroup className="relative z-10 items-center gap-4 pb-16 text-center sm:pb-24">
        <RevealItem>
          <p className="text-xs font-medium tracking-wide text-primary uppercase">
            {contactPage.eyebrow}
          </p>
        </RevealItem>
        <SectionHeading
          title={contactPage.title}
          subtitle={contactPage.subtitle}
        />
      </RevealGroup>
      <HeroRule className="relative z-10" />
    </section>
  );
}
