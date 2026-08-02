"use client";

import { motion } from "framer-motion";
import { hero } from "@/lib/mock-data";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { Button } from "@/components/ui/Button";
import { HeroGlobeVisual } from "@/components/sections/HeroGlobeVisual";
import { HeroRule } from "@/components/ui/HeroRule";

export function Hero() {
  return (
    <section className="relative flex min-h-[calc(100svh-4rem)] flex-col items-center overflow-clip px-gutter pt-16 pb-[min(40vw,13rem)] md:h-[calc(100svh-4rem)] md:max-h-[54rem] md:min-h-0 md:pt-[clamp(1.25rem,3.5vmin,2.25rem)] md:pb-0">
      <motion.div
        className="relative z-10 flex w-full max-w-[680px] flex-col items-center gap-6 text-center sm:gap-7 md:gap-8 md:pb-[clamp(1.5rem,5.5vmin,4.25rem)]"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <motion.p
          variants={fadeUp}
          className="whitespace-nowrap text-[11px] tracking-[0.18em] text-primary uppercase sm:text-xs"
        >
          {hero.eyebrow}
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="flex flex-col items-center gap-4 sm:gap-5"
        >
          <h1 className="text-balance text-[clamp(2.125rem,3.8vw+0.9rem,3.75rem)] font-medium tracking-tight">
            {hero.title.map((line) => (
              <span key={line} className="block leading-[1.08]">
                {line}
              </span>
            ))}
          </h1>
          <p className="max-w-[34rem] text-pretty text-[clamp(1rem,1.1vw+0.8rem,1.3125rem)] leading-[1.6] text-text-03">
            {hero.subtitle.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>
        </motion.div>

        <motion.div variants={fadeUp}>
          <Button
            href="/contact"
            variant="primary"
            className="px-7 py-3.5 text-base"
          >
            {hero.cta}
          </Button>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="grid w-full max-w-[22rem] grid-cols-3 gap-3 border-t border-white/10 pt-5 md:hidden"
        >
          {hero.points.map((point) => (
            <div key={point.label} className="flex flex-col items-center gap-1">
              <span className="text-[12px] font-medium tracking-tight text-white sm:text-sm">
                {point.label}
              </span>
              <span className="text-[10px] leading-snug text-text-03 sm:text-[11px]">
                {point.detail}
              </span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      <HeroGlobeVisual />
      <HeroRule className="relative z-10 mt-auto w-full" />
    </section>
  );
}
