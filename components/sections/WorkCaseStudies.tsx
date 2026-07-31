"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Check, ArrowUpRight } from "lucide-react";
import { workPage } from "@/lib/mock-data";

function CaseImage({
  study,
  active,
}: {
  study: (typeof workPage.caseStudies)[number];
  active: boolean;
}) {
  return (
    <motion.div
      className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-card-bg shadow-[0_0_40px_rgba(0,145,255,0.12)]"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={
        active ? { opacity: 1, scale: 1 } : { opacity: 0.4, scale: 0.96 }
      }
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_top,rgba(0,145,255,0.12),transparent_55%)]" />
      <div className="relative aspect-[16/10] w-full">
        <Image
          src={study.image}
          alt={study.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 28rem"
          className="object-cover object-top"
          priority={false}
        />
      </div>
    </motion.div>
  );
}

function CaseBlock({
  study,
  textOnLeft,
}: {
  study: (typeof workPage.caseStudies)[number];
  textOnLeft: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, {
    once: false,
    amount: 0.25,
    margin: "0px 0px -6% 0px",
  });

  const text = (
    <motion.div
      className="flex w-full min-w-0 flex-col gap-3"
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.1, delayChildren: 0.06 } },
      }}
    >
      <motion.p
        className="w-full text-[15px] leading-relaxed text-text-03 text-pretty sm:text-base"
        variants={{
          hidden: { opacity: 0, y: 12 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
          },
        }}
      >
        {study.description}
      </motion.p>

      <ul className="flex w-full flex-col gap-1.5">
        {study.outcomes.map((outcome) => (
          <motion.li
            key={outcome}
            className="flex w-full items-start gap-2.5 text-[15px] leading-snug text-text-02 sm:text-base"
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
              },
            }}
          >
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
              <Check size={12} strokeWidth={2.5} />
            </span>
            <span className="min-w-0 flex-1">{outcome}</span>
          </motion.li>
        ))}
      </ul>

      {study.stack && (
        <motion.div
          className="flex flex-wrap gap-2 pt-1"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { delay: 0.15 } },
          }}
        >
          {study.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-text-03"
            >
              {tech}
            </span>
          ))}
        </motion.div>
      )}

      {study.href && study.linkLabel && (
        <motion.a
          href={study.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 pt-1 text-sm font-medium text-primary transition-colors hover:text-white"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { delay: 0.2 } },
          }}
        >
          {study.linkLabel}
          <ArrowUpRight size={14} />
        </motion.a>
      )}
    </motion.div>
  );

  const visual = (
    <motion.div
      className="relative mx-auto w-full min-w-0 max-w-xl lg:max-w-none"
      initial={{ opacity: 0, x: textOnLeft ? 20 : -20, y: 8 }}
      animate={
        inView
          ? { opacity: 1, x: 0, y: 0 }
          : { opacity: 0, x: textOnLeft ? 20 : -20, y: 8 }
      }
      transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <CaseImage study={study} active={inView} />
    </motion.div>
  );

  return (
    <article
      ref={ref}
      id={study.id}
      className="relative scroll-mt-28 overflow-x-clip py-5 sm:scroll-mt-32 sm:py-6 md:py-7 lg:overflow-visible"
    >
      <div
        className={`pointer-events-none absolute top-8 h-[160px] w-[160px] rounded-full bg-primary/10 blur-[70px] sm:h-[200px] sm:w-[200px] ${
          textOnLeft ? "right-0 translate-x-1/4" : "left-0 -translate-x-1/4"
        }`}
        aria-hidden
      />

      <div className="relative z-10 flex flex-col gap-3 sm:gap-4">
        <motion.div
          className="flex w-full flex-col gap-1.5 text-left sm:gap-2"
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="w-fit rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-[11px] font-medium tracking-wide text-primary">
            {study.badge}
          </span>
          <div className="relative w-full">
            <span
              className="absolute top-1/2 left-0 z-10 hidden size-2.5 -translate-x-[4.5px] -translate-y-1/2 rounded-full bg-primary shadow-[0_0_12px_rgba(0,145,255,0.6)] lg:block lg:-left-10"
              aria-hidden
            />
            <h3 className="w-full text-[clamp(1.45rem,3.5vw+0.65rem,2.35rem)] font-medium tracking-tight leading-[1.15] text-balance">
              {study.name}
            </h3>
          </div>
          <p className="w-full text-base leading-snug text-text-03 text-pretty sm:text-lg">
            {study.summary}
          </p>
        </motion.div>

        <div
          className={`grid w-full grid-cols-1 items-start gap-4 sm:gap-5 lg:gap-8 ${
            textOnLeft
              ? "lg:grid-cols-[1.05fr_0.95fr]"
              : "lg:grid-cols-[0.95fr_1.05fr]"
          }`}
        >
          <div className={`min-w-0 ${textOnLeft ? "" : "lg:order-2"}`}>
            {text}
          </div>
          <div className={`min-w-0 ${textOnLeft ? "" : "lg:order-1"}`}>
            {visual}
          </div>
        </div>
      </div>
    </article>
  );
}

export function WorkCaseStudies() {
  const { overview, caseStudies } = workPage;

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

          {caseStudies.map((study, i) => (
            <CaseBlock key={study.id} study={study} textOnLeft={i % 2 === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}
