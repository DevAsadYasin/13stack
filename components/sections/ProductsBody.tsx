"use client";

import { productsPage } from "@/lib/mock-data";
import { ProductFeature } from "@/components/sections/ProductFeature";
import { ElimMcpDetail } from "@/components/sections/ElimMcpDetail";

export function ProductsBody() {
  const { overview } = productsPage;

  return (
    <section className="relative px-gutter pb-6 pt-1 sm:pb-8 sm:pt-2 md:pb-10">
      <div className="relative mx-auto w-full max-w-[var(--page-max-width)] lg:pl-6">
        <div className="relative lg:pl-10">
          <div
            className="pointer-events-none absolute top-0 bottom-6 left-0 hidden w-px bg-white/10 lg:block"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute top-0 bottom-6 left-0 hidden w-px bg-primary/30 lg:block"
            aria-hidden
            style={{
              maskImage:
                "linear-gradient(to bottom, black, black 92%, transparent)",
              WebkitMaskImage:
                "linear-gradient(to bottom, black, black 92%, transparent)",
            }}
          />

          <header className="relative mb-3 flex w-full flex-col gap-2 text-left sm:mb-5 sm:gap-3">
            <p className="text-xs font-medium tracking-wide text-primary uppercase">
              {overview.eyebrow}
            </p>
            <div className="relative w-full">
              <span
                className="absolute top-1/2 left-0 z-10 hidden size-2.5 -translate-x-[4.5px] -translate-y-1/2 rounded-full bg-primary shadow-[0_0_12px_rgba(0,145,255,0.6)] lg:block lg:-left-10"
                aria-hidden
              />
              <h2 className="w-full text-[clamp(1.65rem,4vw+0.75rem,2.75rem)] font-medium tracking-tight leading-[1.15] text-balance">
                {overview.title}
              </h2>
            </div>
            <p className="w-full text-base leading-snug text-text-03 text-pretty sm:text-lg lg:text-xl">
              {overview.subtitle}
            </p>
          </header>

          <ProductFeature />
          <ElimMcpDetail />
        </div>
      </div>
    </section>
  );
}
