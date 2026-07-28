"use client";

import { motion } from "framer-motion";
import { hero } from "@/lib/mock-data";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { Button } from "@/components/ui/Button";
import { HeroGlobeVisual } from "@/components/sections/HeroGlobeVisual";
import { HeroRule } from "@/components/ui/HeroRule";

export function Hero() {
  return (
    <section className="relative flex min-h-[clamp(38rem,100svh,58rem)] flex-col items-center justify-start overflow-clip px-gutter pt-[clamp(4.5rem,10vh,6.5rem)] pb-0">
      <motion.div
        className="relative z-10 flex max-w-[680px] flex-1 flex-col items-center gap-8 pb-[clamp(2.75rem,9vh,5.25rem)] text-center"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <motion.div
          variants={fadeUp}
          className="flex flex-col items-center gap-5"
        >
          <h1 className="text-balance text-[clamp(2.375rem,4.5vw+1rem,3.75rem)] font-medium tracking-tight">
            {hero.title.map((line) => (
              <span key={line} className="block leading-[1.08]">
                {line}
              </span>
            ))}
          </h1>
          <p className="max-w-[34rem] text-pretty text-[clamp(1.0625rem,1.25vw+0.875rem,1.3125rem)] leading-[1.65] text-text-03">
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
      </motion.div>

      <HeroGlobeVisual />
      <HeroRule className="relative z-10 w-full" />
    </section>
  );
}
