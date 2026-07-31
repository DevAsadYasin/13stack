"use client";

import { motion } from "framer-motion";
import { Layers2 } from "lucide-react";
import { productsPage } from "@/lib/mock-data";
import { Button } from "@/components/ui/Button";
import { viewportOnce } from "@/lib/motion";

const toneClass: Record<string, string> = {
  dim: "text-white/45",
  out: "text-red-300/90",
  skip: "text-primary",
  ok: "text-green",
};

export function ElimMcpDetail() {
  const { elim } = productsPage;

  return (
    <article
      id={elim.id}
      className="relative scroll-mt-28 overflow-x-clip py-6 sm:scroll-mt-32 sm:py-8 lg:overflow-visible lg:py-10"
    >
      <div
        className="pointer-events-none absolute top-1/2 left-0 h-[200px] w-[200px] -translate-x-1/4 -translate-y-1/2 rounded-full bg-primary/12 blur-[80px] sm:h-[280px] sm:w-[280px]"
        aria-hidden
      />

      <div className="relative z-10 flex flex-col gap-5 sm:gap-7 lg:gap-8">
        <div className="flex w-full flex-col gap-2 text-left sm:gap-3">
          <span className="w-fit rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-[11px] font-medium tracking-wide text-primary">
            {elim.badge}
          </span>
          <div className="relative w-full">
            <span
              className="absolute top-1/2 left-0 z-10 hidden size-2.5 -translate-x-[4.5px] -translate-y-1/2 rounded-full bg-primary shadow-[0_0_12px_rgba(0,145,255,0.6)] lg:block lg:-left-10"
              aria-hidden
            />
            <div className="flex flex-wrap items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/15 text-primary shadow-[0_0_18px_rgba(0,145,255,0.35)] sm:h-11 sm:w-11">
                <Layers2 size={20} />
              </span>
              <h2 className="text-[clamp(1.55rem,4vw+0.7rem,2.75rem)] font-medium tracking-tight leading-[1.15]">
                {elim.name}
              </h2>
            </div>
          </div>
          <p className="w-full text-base font-medium tracking-tight text-white/90 sm:text-lg">
            {elim.tagline}
          </p>
          <p className="w-full max-w-3xl text-base leading-snug text-text-03 text-pretty sm:text-lg">
            {elim.description}
          </p>
          <div className="pt-1">
            <Button
              href={elim.ctaHref}
              variant="secondary"
              className="w-full px-7 py-3.5 text-base sm:w-auto"
            >
              {elim.cta}
            </Button>
          </div>
        </div>

        <motion.div
          className="w-full min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-[#060d14] shadow-[0_0_40px_rgba(0,145,255,0.12)]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="ml-2 font-mono text-[11px] tracking-wide text-white/40">
              elim-mcp · session memory
            </span>
          </div>

          <div className="grid gap-5 p-4 font-mono text-[12px] leading-relaxed sm:grid-cols-2 sm:p-5 sm:text-[13px] lg:grid-cols-[1fr_0.9fr]">
            <div className="space-y-5">
              {elim.sessions.map((session) => (
                <div key={session.label}>
                  <p className="mb-2 text-[10px] font-semibold tracking-[0.14em] text-primary uppercase">
                    {session.label}
                  </p>
                  <div className="space-y-1.5 rounded-lg border border-white/8 bg-black/35 p-3">
                    {session.lines.map((line) => (
                      <p
                        key={line.text}
                        className={toneClass[line.tone] ?? "text-white/70"}
                      >
                        {line.text}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div>
              <p className="mb-2 text-[10px] font-semibold tracking-[0.14em] text-primary uppercase">
                Trace
              </p>
              <div className="space-y-1 rounded-lg border border-primary/20 bg-primary/5 p-3 text-white/75">
                {elim.trace.map((line) => (
                  <p key={line} className="whitespace-pre-wrap">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </article>
  );
}
