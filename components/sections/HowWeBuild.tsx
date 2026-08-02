"use client";

import { howWeBuild } from "@/lib/mock-data";
import { RevealGroup } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MultiPathBuildFlow } from "@/components/sections/MultiPathBuildFlow";

export function HowWeBuild() {
  return (
    <section className="px-gutter py-10 sm:py-16">
      <RevealGroup className="w-full items-center gap-5 sm:gap-2">
        <SectionHeading
          title={howWeBuild.title}
          subtitle={howWeBuild.subtitle}
        />
        <MultiPathBuildFlow
          cta={{ label: howWeBuild.cta, href: howWeBuild.ctaHref }}
        />
      </RevealGroup>
    </section>
  );
}
