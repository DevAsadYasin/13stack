"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { HeroRule } from "@/components/ui/HeroRule";

type SplitHeroProps = {
  eyebrow: string;
  from: string;
  to: string;
  subtitle: string;
  visual: ReactNode;
  rule?: boolean;
};

export function SplitHero({
  eyebrow,
  from,
  to,
  subtitle,
  visual,
  rule = true,
}: SplitHeroProps) {
  return (
    <section
      className={`relative overflow-clip px-gutter pt-[clamp(3rem,5.5vh,4.75rem)] ${
        rule ? "pb-0" : "pb-[clamp(1.25rem,3vh,2.5rem)]"
      }`}
    >
      <div
        className={`relative mx-auto w-full max-w-[1280px] ${
          rule ? "pb-[clamp(1.25rem,3vh,2.5rem)]" : ""
        }`}
      >
        <motion.div
          className="relative z-10 grid w-full grid-cols-1 items-center gap-8 md:gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-8 xl:gap-10"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <div className="flex min-w-0 flex-col items-start justify-center">
            <motion.p
              variants={fadeUp}
              className="mb-2.5 text-xs font-medium tracking-wide text-primary uppercase sm:mb-3"
            >
              {eyebrow}
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="flex w-full flex-col gap-0.5 tracking-tight"
            >
              <span className="flex flex-wrap items-baseline gap-2 sm:gap-2.5 md:gap-3">
                <span className="text-sm font-normal tracking-wide text-text-03 lowercase sm:text-base">
                  from
                </span>
                <span className="text-[clamp(1.7rem,6vw+0.4rem,2.85rem)] font-light leading-[1.1] text-white/55">
                  {from}
                </span>
              </span>
              <span className="flex flex-wrap items-baseline gap-2 sm:gap-2.5 md:gap-3">
                <span className="text-sm font-normal tracking-wide text-text-03 lowercase sm:text-base">
                  to
                </span>
                <span
                  className="text-[clamp(1.7rem,6vw+0.4rem,2.85rem)] font-bold leading-[1.1] text-white"
                  style={{
                    textShadow:
                      "0 0 16px rgba(0,145,255,0.5), 0 0 36px rgba(0,145,255,0.22)",
                  }}
                >
                  {to}
                </span>
              </span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="mt-3.5 max-w-prose text-sm leading-relaxed text-pretty text-text-03 sm:mt-4 sm:text-base"
            >
              {subtitle}
            </motion.p>
          </div>
          <motion.div
            variants={fadeUp}
            className="relative mx-auto flex w-full items-center justify-center lg:justify-self-center"
          >
            {visual}
          </motion.div>
        </motion.div>
      </div>
      {rule ? <HeroRule /> : null}
    </section>
  );
}
