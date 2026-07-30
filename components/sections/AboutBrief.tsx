"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Bot,
  Handshake,
  Rocket,
  Users,
  type LucideIcon,
} from "lucide-react";
import { homeAbout } from "@/lib/mock-data";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { TextLink } from "@/components/ui/TextLink";

const AUTO_MS = 5200;

const slideIcons: Record<string, LucideIcon> = {
  ownership: Users,
  direct: Handshake,
  production: Rocket,
  "ai-native": Bot,
};

export function AboutBrief() {
  const slides = homeAbout.slides;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [direction, setDirection] = useState(1);

  const goTo = useCallback(
    (next: number, dir: number) => {
      setDirection(dir);
      setIndex((next + slides.length) % slides.length);
    },
    [slides.length],
  );

  const prev = useCallback(() => goTo(index - 1, -1), [goTo, index]);
  const next = useCallback(() => goTo(index + 1, 1), [goTo, index]);

  useEffect(() => {
    if (paused || slides.length < 2) return;
    const id = window.setInterval(() => {
      setDirection(1);
      setIndex((i) => (i + 1) % slides.length);
    }, AUTO_MS);
    return () => window.clearInterval(id);
  }, [paused, slides.length]);

  const slide = slides[index];
  const Icon = slideIcons[slide.id] ?? Users;

  return (
    <section className="px-gutter py-16 sm:py-20">
      <RevealGroup className="w-full items-stretch gap-10 sm:gap-12 lg:grid lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-start lg:gap-14">
        <div className="flex max-w-xl flex-col gap-5 text-left sm:gap-6">
          <RevealItem className="flex flex-col gap-3 sm:gap-4">
            <p className="text-xs font-medium tracking-wide text-primary uppercase">
              {homeAbout.eyebrow}
            </p>
            <h2 className="text-[clamp(1.75rem,3vw+0.8rem,2.5rem)] font-medium tracking-tight leading-[1.15] text-balance">
              {homeAbout.title}
            </h2>
            <p className="text-base leading-relaxed text-pretty text-text-03 sm:text-lg">
              {homeAbout.subtitle}
            </p>
          </RevealItem>

          <RevealItem>
            <p className="border-l border-primary/40 pl-4 text-base leading-relaxed text-pretty text-text-02 sm:text-lg">
              {homeAbout.body}
            </p>
          </RevealItem>

          <RevealItem className="flex flex-col items-start gap-3 pt-1 sm:gap-4">
            <p className="text-sm leading-relaxed text-pretty text-text-03">
              {homeAbout.aside}
            </p>
            <TextLink href={homeAbout.ctaHref}>{homeAbout.cta}</TextLink>
          </RevealItem>
        </div>

        <RevealItem className="w-full min-w-0">
          <div
            className="flex flex-col gap-4"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocusCapture={() => setPaused(true)}
            onBlurCapture={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
                setPaused(false);
              }
            }}
          >
            <div className="relative pt-3 pr-3">
              <div
                className="absolute top-0 right-0 left-3 h-full rounded-2xl border border-white/[0.06] bg-white/[0.02]"
                aria-hidden
              />
              <div
                className="absolute top-1.5 right-1.5 left-1.5 h-[calc(100%-0.375rem)] rounded-2xl border border-white/[0.08] bg-[#111]"
                aria-hidden
              />

              <div className="relative overflow-hidden rounded-2xl border border-white/12 bg-card-bg">
                <div
                  className="absolute inset-y-0 left-0 w-1 bg-primary"
                  aria-hidden
                />

                <div className="relative flex min-h-[300px] flex-col p-6 pl-7 sm:min-h-[340px] sm:p-8 sm:pl-9">
                  <div className="mb-8 flex items-center justify-between gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-primary">
                      <Icon size={20} strokeWidth={1.75} />
                    </span>
                    <span className="font-mono text-[11px] tracking-wide text-text-03">
                      {slide.label} / {String(slides.length).padStart(2, "0")}
                    </span>
                  </div>

                  <AnimatePresence
                    initial={false}
                    custom={direction}
                    mode="wait"
                  >
                    <motion.div
                      key={slide.id}
                      custom={direction}
                      variants={{
                        enter: (dir: number) => ({
                          x: dir > 0 ? 24 : -24,
                          opacity: 0,
                        }),
                        center: { x: 0, opacity: 1 },
                        exit: (dir: number) => ({
                          x: dir > 0 ? -20 : 20,
                          opacity: 0,
                        }),
                      }}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="flex flex-1 flex-col justify-end gap-3"
                    >
                      <h3 className="text-2xl font-semibold tracking-tight text-white sm:text-[1.75rem]">
                        {slide.title}
                      </h3>
                      <p className="max-w-md text-base leading-relaxed text-pretty text-text-03 sm:text-lg">
                        {slide.line}
                      </p>
                    </motion.div>
                  </AnimatePresence>

                  <div className="mt-8 flex gap-1.5" aria-hidden>
                    {slides.map((s, i) => (
                      <span
                        key={s.id}
                        className={`h-0.5 flex-1 rounded-full transition-colors ${
                          i === index ? "bg-primary" : "bg-white/15"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between gap-4">
              <div
                className="flex items-center gap-2"
                role="tablist"
                aria-label="About slides"
              >
                {slides.map((s, i) => (
                  <button
                    key={s.id}
                    type="button"
                    role="tab"
                    aria-selected={i === index}
                    aria-label={`Show ${s.title}`}
                    onClick={() => goTo(i, i > index ? 1 : -1)}
                    className={`h-1.5 rounded-full transition-all ${
                      i === index
                        ? "w-7 bg-primary"
                        : "w-1.5 bg-white/25 hover:bg-white/45"
                    }`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={prev}
                  aria-label="Previous slide"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-white/30 hover:text-white"
                >
                  <ArrowLeft size={16} />
                </button>
                <button
                  type="button"
                  onClick={next}
                  aria-label="Next slide"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-white/30 hover:text-white"
                >
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </RevealItem>
      </RevealGroup>
    </section>
  );
}
