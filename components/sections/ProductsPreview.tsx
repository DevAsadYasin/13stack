"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { homeProducts } from "@/lib/mock-data";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { TextLink } from "@/components/ui/TextLink";

export function ProductsPreview() {
  return (
    <section className="px-gutter py-16 sm:py-20">
      <RevealGroup className="w-full items-stretch gap-10 sm:gap-12 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-start lg:gap-16">
        <div className="flex max-w-xl flex-col gap-5 text-left sm:gap-6">
          <RevealItem className="flex flex-col gap-3 sm:gap-4">
            <p className="text-xs font-medium tracking-wide text-primary uppercase">
              {homeProducts.eyebrow}
            </p>
            <h2 className="text-[clamp(1.75rem,3vw+0.8rem,2.5rem)] font-medium tracking-tight leading-[1.15] text-balance">
              {homeProducts.title}
            </h2>
            <p className="text-base leading-relaxed text-pretty text-text-03 sm:text-lg">
              {homeProducts.subtitle}
            </p>
          </RevealItem>

          <RevealItem>
            <p className="text-base leading-relaxed text-pretty text-text-02 sm:text-lg">
              {homeProducts.body}
            </p>
          </RevealItem>

          <RevealItem>
            <p className="text-sm leading-relaxed text-pretty text-text-03 sm:text-base">
              {homeProducts.aside}
            </p>
          </RevealItem>

          <RevealItem className="pt-1">
            <TextLink href={homeProducts.viewAllHref}>
              {homeProducts.viewAllLabel}
            </TextLink>
          </RevealItem>
        </div>

        <div className="flex w-full flex-col border-t border-white/10 lg:mt-2">
          {homeProducts.items.map((item) => (
            <RevealItem key={item.id} className="w-full">
              <Link
                href={item.href}
                className="group flex w-full items-start gap-4 border-b border-white/10 py-5 transition-colors sm:gap-5 sm:py-7"
              >
                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] font-mono text-sm font-semibold text-primary transition-colors group-hover:border-primary/40 group-hover:bg-primary/10 sm:h-12 sm:w-12 sm:text-base"
                  aria-hidden
                >
                  {item.mark}
                </span>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3 className="text-lg font-semibold tracking-tight text-white sm:text-xl">
                      {item.name}
                    </h3>
                    <span className="text-xs tracking-wide text-text-03">
                      {item.meta}
                    </span>
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-text-03 sm:text-[15px]">
                    {item.line}
                  </p>
                </div>

                <ArrowUpRight
                  size={18}
                  className="mt-1 shrink-0 text-white/35 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary"
                />
              </Link>
            </RevealItem>
          ))}
        </div>
      </RevealGroup>
    </section>
  );
}
