"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import { workPage } from "@/lib/mock-data";

export function HeroWorkVisual() {
  const phases = workPage.heroPhases;
  const defaultIndex = Math.max(
    0,
    phases.findIndex((phase) => phase.status === "active"),
  );
  const [active, setActive] = useState(defaultIndex);
  const current = phases[active];

  return (
    <motion.div
      className="relative mx-auto w-full max-w-[26rem] xl:max-w-[28rem]"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <p className="mb-2.5 text-[11px] font-medium tracking-wide text-primary uppercase">
        Delivery log
      </p>

      <div className="overflow-hidden rounded-2xl border border-white/12 bg-card-bg">
        <div className="grid grid-cols-[5.5rem_minmax(0,1fr)] sm:grid-cols-[5.75rem_minmax(0,1fr)]">
          <div className="flex flex-col gap-0.5 border-r border-white/10 bg-[#0d0d0d]/70 p-1.5">
            {phases.map((phase, i) => {
              const isActive = i === active;
              const isDone = i < active;

              return (
                <button
                  key={phase.id}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-pressed={isActive}
                  className={`flex w-full items-center gap-1.5 rounded-md px-1.5 py-1.5 text-left transition-colors ${
                    isActive
                      ? "bg-primary/15 text-white"
                      : "text-text-03 hover:bg-white/[0.04] hover:text-white"
                  }`}
                >
                  <span
                    className={`flex size-4 shrink-0 items-center justify-center rounded-full border text-[9px] font-semibold ${
                      isActive
                        ? "border-primary bg-primary text-white"
                        : isDone
                          ? "border-primary/40 bg-primary/15 text-primary"
                          : "border-white/15 bg-transparent text-text-03"
                    }`}
                  >
                    {isDone && !isActive ? (
                      <Check size={8} strokeWidth={2.5} />
                    ) : (
                      i + 1
                    )}
                  </span>
                  <span className="truncate text-[11px] font-semibold tracking-tight">
                    {phase.label}
                  </span>
                </button>
              );
            })}
          </div>
          <div className="relative min-h-[8.75rem] sm:min-h-[9.25rem]">
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-primary/50 via-primary/20 to-transparent"
              aria-hidden
            />
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                className="flex h-full flex-col gap-2.5 p-3.5 sm:gap-3 sm:p-4"
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -6 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="font-mono text-[10px] tracking-wide text-primary">
                    {String(active + 1).padStart(2, "0")} /{" "}
                    {String(phases.length).padStart(2, "0")}
                  </p>
                  <span className="text-[10px] font-medium tracking-wide text-text-03 uppercase">
                    {current.label}
                  </span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-base font-semibold tracking-tight text-white sm:text-lg">
                    {current.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-pretty text-text-03 sm:text-[13px]">
                    {current.line}
                  </p>
                </div>
                <ul className="mt-auto flex flex-wrap gap-1.5 pt-1">
                  {current.marks.map((mark) => (
                    <li
                      key={mark}
                      className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-1 text-[10px] text-text-02 sm:text-[11px]"
                    >
                      {mark}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
