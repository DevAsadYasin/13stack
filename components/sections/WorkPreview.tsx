"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { homeWork } from "@/lib/mock-data";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { TextLink } from "@/components/ui/TextLink";

const AUTO_MS = 5200;

export function WorkPreview() {
  const slides = homeWork.slides;
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

  return (
    <section className="px-gutter py-16 sm:py-20">
      <RevealGroup className="w-full items-stretch gap-10 sm:gap-12 lg:grid lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-start lg:gap-14">
        <div className="flex max-w-xl flex-col gap-5 text-left sm:gap-6">
          <RevealItem className="flex flex-col gap-3 sm:gap-4">
            <p className="text-xs font-medium tracking-wide text-primary uppercase">
              {homeWork.eyebrow}
            </p>
            <h2 className="text-[clamp(1.75rem,3vw+0.8rem,2.5rem)] font-medium tracking-tight leading-[1.15] text-balance">
              {homeWork.title}
            </h2>
            <p className="text-base leading-relaxed text-pretty text-text-03 sm:text-lg">
              {homeWork.subtitle}
            </p>
          </RevealItem>

          <RevealItem>
            <p className="text-base leading-relaxed text-pretty text-text-02 sm:text-lg">
              {homeWork.body}
            </p>
          </RevealItem>

          <RevealItem>
            <p className="text-sm leading-relaxed text-pretty text-text-03 sm:text-base">
              {homeWork.aside}
            </p>
          </RevealItem>

          <RevealItem className="pt-1">
            <TextLink href={homeWork.viewAllHref}>
              {homeWork.viewAllLabel}
            </TextLink>
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
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d0d]">
              <div className="relative aspect-[16/10] w-full">
                <AnimatePresence
                  initial={false}
                  custom={direction}
                  mode="popLayout"
                >
                  <motion.div
                    key={slide.id}
                    custom={direction}
                    variants={{
                      enter: (dir: number) => ({
                        x: dir > 0 ? "12%" : "-12%",
                        opacity: 0,
                      }),
                      center: { x: 0, opacity: 1 },
                      exit: (dir: number) => ({
                        x: dir > 0 ? "-10%" : "10%",
                        opacity: 0,
                      }),
                    }}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={slide.image}
                      alt={slide.imageAlt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover object-top"
                      priority={index === 0}
                    />
                    <div
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"
                      aria-hidden
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-3 p-4 sm:p-5">
                <Link
                  href={slide.href}
                  className="group inline-flex items-center gap-2 text-base font-semibold tracking-tight text-white transition-colors hover:text-primary sm:text-lg"
                >
                  {slide.name}
                  <ArrowUpRight
                    size={16}
                    className="text-white/50 transition-colors group-hover:text-primary"
                  />
                </Link>
                <span className="font-mono text-[11px] tracking-wide text-white/50">
                  {String(index + 1).padStart(2, "0")} /{" "}
                  {String(slides.length).padStart(2, "0")}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between gap-4">
              <div
                className="flex items-center gap-2"
                role="tablist"
                aria-label="Work slides"
              >
                {slides.map((s, i) => (
                  <button
                    key={s.id}
                    type="button"
                    role="tab"
                    aria-selected={i === index}
                    aria-label={`Show ${s.name}`}
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
                  aria-label="Previous work"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-primary/40 hover:text-primary"
                >
                  <ArrowLeft size={16} />
                </button>
                <button
                  type="button"
                  onClick={next}
                  aria-label="Next work"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-primary/40 hover:text-primary"
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
