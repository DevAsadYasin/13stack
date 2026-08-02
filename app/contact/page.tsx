import type { Metadata } from "next";
import { ContactHero } from "@/components/sections/ContactHero";
import { ContactForm } from "@/components/sections/ContactForm";
import { HeroRule } from "@/components/ui/HeroRule";
import { contactPage } from "@/lib/mock-data";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: contactPage.subtitle,
};

export default function ContactPage() {
  return (
    <main className="flex flex-1 flex-col">
      <section className="relative overflow-clip px-gutter pt-[clamp(3rem,5.5vh,4.75rem)] pb-0">
        <div
          className="pointer-events-none absolute top-[18%] left-1/2 h-[280px] w-[280px] -translate-x-1/2 rounded-full bg-primary/20 blur-[110px] lg:left-[18%] lg:translate-x-0"
          aria-hidden
        />

        <div className="relative z-10 mx-auto grid w-full max-w-[1100px] gap-12 pb-16 sm:gap-14 sm:pb-20 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-start lg:gap-16 xl:gap-20">
          <ContactHero />
          <ContactForm />
        </div>

        <HeroRule className="relative z-10" />
      </section>

      <section className="px-gutter py-10 sm:py-12">
        <p className="text-center text-sm text-text-03">
          Or email{" "}
          <a
            href={`mailto:${siteConfig.contactEmail}`}
            className="font-medium text-white transition-colors hover:text-primary"
          >
            {siteConfig.contactEmail}
          </a>{" "}
          anytime.
        </p>
      </section>
    </main>
  );
}
