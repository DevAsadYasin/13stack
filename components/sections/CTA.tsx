import { cta } from "@/lib/mock-data";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

export function CTA() {
  return (
    <section className="relative overflow-clip px-gutter py-10 sm:py-14 md:py-16">
      <div
        className="absolute top-1/2 left-1/2 h-[220px] w-[220px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/20 sm:h-[320px] sm:w-[320px] md:h-[420px] md:w-[420px]"
        aria-hidden
      />

      <RevealGroup className="relative items-center gap-5 overflow-hidden rounded-2xl bg-primary px-5 py-12 text-center sm:gap-6 sm:rounded-3xl sm:px-8 sm:py-16 md:py-20">
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full opacity-25"
          viewBox="0 0 800 300"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path
            d="M0 60 H120 L150 90 V180 L180 210 H340"
            fill="none"
            stroke="white"
            strokeWidth="1"
          />
          <path
            d="M0 150 H80 L110 180 V260"
            fill="none"
            stroke="white"
            strokeWidth="1"
          />
          <path
            d="M800 100 H680 L650 130 V220 L620 250 H460"
            fill="none"
            stroke="white"
            strokeWidth="1"
          />
          <path
            d="M800 200 H720 L690 230 V280"
            fill="none"
            stroke="white"
            strokeWidth="1"
          />
        </svg>

        <RevealItem className="relative flex w-full flex-col items-center gap-3 sm:gap-4">
          <h2 className="w-full max-w-[560px] text-balance text-2xl leading-tight font-medium tracking-tight text-white sm:text-3xl md:text-4xl">
            {cta.title}
          </h2>
          <p className="w-full max-w-[480px] text-pretty text-sm leading-relaxed text-white/85 sm:text-base">
            {cta.subtitle}
          </p>
        </RevealItem>
        <RevealItem className="relative w-full sm:w-auto">
          <Button href="/contact" variant="light" className="w-full sm:w-auto">
            {cta.cta}
          </Button>
        </RevealItem>
      </RevealGroup>
    </section>
  );
}
