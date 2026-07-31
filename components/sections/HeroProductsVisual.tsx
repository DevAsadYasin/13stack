"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { productsPage } from "@/lib/mock-data";

export function HeroProductsVisual() {
  const stages = productsPage.heroStages;
  const [active, setActive] = useState(2);
  const current = stages[active];

  return (
    <motion.div
      className="relative mx-auto w-full max-w-[22rem] xl:max-w-[24rem]"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <p className="mb-3 text-[11px] font-medium tracking-wide text-primary uppercase">
        How we ship products
      </p>
      <div className="relative mb-5">
        <div
          className="absolute top-3 right-3 left-3 h-px bg-white/10"
          aria-hidden
        />
        <motion.div
          className="absolute top-3 left-3 h-px bg-primary"
          aria-hidden
          initial={false}
          animate={{
            width: `calc(${(active / Math.max(stages.length - 1, 1)) * 100}% - 0.75rem)`,
          }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        />

        <div className="relative flex justify-between gap-2">
          {stages.map((stage, i) => {
            const isActive = i === active;
            const isPast = i < active;

            return (
              <button
                key={stage.id}
                type="button"
                onClick={() => setActive(i)}
                aria-pressed={isActive}
                aria-label={stage.label}
                className="flex flex-col items-center gap-2"
              >
                <span
                  className={`flex h-6 w-6 items-center justify-center rounded-full border text-[10px] font-semibold transition-colors ${
                    isActive
                      ? "border-primary bg-primary text-white"
                      : isPast
                        ? "border-primary/50 bg-primary/20 text-primary"
                        : "border-white/15 bg-[#0d0d0d] text-text-03"
                  }`}
                >
                  {i + 1}
                </span>
                <span
                  className={`text-[11px] font-medium tracking-tight ${
                    isActive ? "text-white" : "text-text-03"
                  }`}
                >
                  {stage.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
      <div className="relative min-h-[9.5rem] overflow-hidden rounded-2xl border border-white/12 bg-card-bg">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            className="flex h-full flex-col gap-3 p-5 sm:p-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-2">
              <span className="font-mono text-[11px] tracking-wide text-primary">
                {String(active + 1).padStart(2, "0")} /{" "}
                {String(stages.length).padStart(2, "0")}
              </span>
              <span className="text-[11px] tracking-wide text-text-03 uppercase">
                {current.label}
              </span>
            </div>
            <h3 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
              {current.title}
            </h3>
            <p className="text-sm leading-relaxed text-pretty text-text-03 sm:text-[15px]">
              {current.line}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
