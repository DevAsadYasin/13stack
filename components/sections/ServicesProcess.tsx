"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Search,
  Network,
  Code2,
  BrainCircuit,
  Rocket,
  LifeBuoy,
  Check,
  type LucideIcon,
} from "lucide-react";
import { servicesPage } from "@/lib/mock-data";

const iconMap: Record<string, LucideIcon> = {
  discovery: Search,
  architecture: Network,
  build: Code2,
  ai: BrainCircuit,
  ship: Rocket,
  support: LifeBuoy,
};

const discFills = ["#071e33", "#0091ff", "#ffffff"] as const;
const iconFills = ["#ffffff", "#ffffff", "#0091ff"] as const;

function StageVisual({
  index,
  total,
  active,
  Icon,
}: {
  index: number;
  total: number;
  active: boolean;
  Icon: LucideIcon;
}) {
  const fill = discFills[index % discFills.length];
  const iconFill = iconFills[index % iconFills.length];
  const cx = 200;
  const cy = 78;
  const r = 30;

  return (
    <svg
      viewBox="0 0 400 150"
      className="h-auto w-full max-w-[22rem] overflow-visible"
      aria-hidden
    >
      <defs>
        <filter
          id={`stage-blur-${index}`}
          x="-50%"
          y="-50%"
          width="200%"
          height="200%"
        >
          <feGaussianBlur stdDeviation="7" />
        </filter>
        <linearGradient
          id={`stage-line-${index}`}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
        >
          <stop offset="0%" stopColor="rgba(0,145,255,0.15)" />
          <stop offset="50%" stopColor="rgba(0,145,255,0.9)" />
          <stop offset="100%" stopColor="rgba(0,145,255,0.2)" />
        </linearGradient>
      </defs>

      <path
        d={`M48 ${cy} H${cx - r - 24}`}
        fill="none"
        stroke="rgba(0,145,255,0.18)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d={`M${cx + r + 24} ${cy} H352`}
        fill="none"
        stroke="rgba(0,145,255,0.18)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <motion.path
        d={`M48 ${cy} H${cx - r - 24}`}
        fill="none"
        stroke={`url(#stage-line-${index})`}
        strokeWidth="2.25"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={
          active ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }
        }
        transition={{ duration: 0.65, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.path
        d={`M${cx + r + 24} ${cy} H352`}
        fill="none"
        stroke={`url(#stage-line-${index})`}
        strokeWidth="2.25"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={
          active ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }
        }
        transition={{ duration: 0.65, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
      />

      {[48, 352].map((x, i) => (
        <motion.circle
          key={x}
          cx={x}
          cy={cy}
          r="4.5"
          fill={i === 0 && index > 0 ? "#0091ff" : "rgba(0,145,255,0.35)"}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={
            active ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }
          }
          transition={{ duration: 0.3, delay: 0.25 + i * 0.12 }}
        />
      ))}

      <motion.g
        initial={{ opacity: 0, scale: 0.55 }}
        animate={
          active ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.55 }
        }
        transition={{ duration: 0.45, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: `${cx}px ${cy}px` }}
      >
        <circle
          cx={cx}
          cy={cy}
          r={r + 22}
          fill="rgba(0,145,255,0.14)"
          filter={`url(#stage-blur-${index})`}
        />
        <circle
          cx={cx}
          cy={cy}
          r={r + 14}
          fill="none"
          stroke="rgba(0,145,255,0.22)"
          strokeWidth="1"
          strokeDasharray="2 5"
        />
        <circle
          cx={cx}
          cy={cy}
          r={r + 7}
          fill="none"
          stroke="rgba(0,145,255,0.35)"
          strokeWidth="1.1"
          strokeDasharray="4 5"
        />
        <circle
          cx={cx}
          cy={cy}
          r={r + 2.5}
          fill="none"
          stroke="rgba(0,145,255,0.5)"
          strokeWidth="1.3"
        />
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill={fill}
          style={{ filter: "drop-shadow(0 0 16px rgba(0,145,255,0.5))" }}
        />
        <foreignObject x={cx - 14} y={cy - 14} width="28" height="28">
          <div className="flex h-full w-full items-center justify-center">
            <Icon size={18} color={iconFill} strokeWidth={1.85} />
          </div>
        </foreignObject>
      </motion.g>

      <g>
        {Array.from({ length: total }, (_, i) => {
          const span = Math.min(160, (total - 1) * 22);
          const start = 200 - span / 2;
          const x = total === 1 ? 200 : start + (i * span) / (total - 1);
          const on = i <= index;
          return (
            <motion.circle
              key={i}
              cx={x}
              cy={132}
              r={i === index ? 4.5 : 3}
              fill={on ? "#0091ff" : "rgba(255,255,255,0.18)"}
              initial={{ opacity: 0 }}
              animate={active ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.28 + i * 0.04 }}
            />
          );
        })}
      </g>
    </svg>
  );
}

function StageBlock({
  stage,
  index,
  total,
  textOnLeft,
}: {
  stage: (typeof servicesPage.process.stages)[number];
  index: number;
  total: number;
  textOnLeft: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, {
    once: false,
    amount: 0.35,
    margin: "0px 0px -6% 0px",
  });
  const Icon = iconMap[stage.icon];

  const text = (
    <motion.div
      className="flex w-full min-w-0 flex-col gap-3"
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
      }}
    >
      <motion.p
        className="w-full text-[15px] leading-relaxed text-text-03 text-pretty sm:text-base"
        variants={{
          hidden: { opacity: 0, y: 12, x: textOnLeft ? -8 : 8 },
          visible: {
            opacity: 1,
            y: 0,
            x: 0,
            transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
          },
        }}
      >
        {stage.detail}
      </motion.p>

      <ul className="flex w-full flex-col gap-1.5">
        {stage.outcomes.map((outcome) => (
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
    </motion.div>
  );

  const visual = (
    <motion.div
      className="relative mx-auto flex w-full min-w-0 max-w-sm items-center justify-center overflow-visible sm:max-w-md lg:max-w-[22rem] lg:justify-self-center"
      initial={{ opacity: 0, x: textOnLeft ? 20 : -20, y: 8 }}
      animate={
        inView
          ? { opacity: 1, x: 0, y: 0 }
          : { opacity: 0, x: textOnLeft ? 20 : -20, y: 8 }
      }
      transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <StageVisual index={index} total={total} active={inView} Icon={Icon} />
    </motion.div>
  );

  return (
    <article
      ref={ref}
      id={`delivery-stage-${index}`}
      className="relative scroll-mt-28 overflow-x-clip py-4 sm:scroll-mt-32 sm:py-5 md:py-6 lg:overflow-visible"
    >
      <div
        className={`pointer-events-none absolute top-8 h-[140px] w-[140px] rounded-full bg-primary/10 blur-[60px] sm:h-[180px] sm:w-[180px] sm:blur-[80px] ${
          textOnLeft ? "right-0 translate-x-1/4" : "left-0 -translate-x-1/4"
        }`}
        aria-hidden
      />

      <div className="relative z-10 flex flex-col gap-3 sm:gap-4">
        <motion.div
          className="flex w-full flex-col gap-1 text-left"
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-[11px] font-medium tracking-wide text-primary uppercase">
            Stage {String(index + 1).padStart(2, "0")}
          </p>
          <div className="relative w-full">
            <span
              className="absolute top-1/2 left-0 z-10 hidden size-2.5 -translate-x-[4.5px] -translate-y-1/2 rounded-full bg-primary shadow-[0_0_12px_rgba(0,145,255,0.6)] lg:block lg:-left-10"
              aria-hidden
            />
            <h3 className="w-full text-[clamp(1.35rem,3.5vw+0.6rem,2rem)] font-medium tracking-tight leading-[1.15] text-balance">
              {stage.title}
            </h3>
          </div>
          <p className="w-full text-sm leading-snug text-text-03 text-pretty sm:text-base md:text-lg">
            {stage.summary}
          </p>
        </motion.div>

        <div
          className={`grid w-full grid-cols-1 items-start gap-4 sm:gap-5 lg:gap-6 ${
            textOnLeft
              ? "lg:grid-cols-[1.15fr_0.85fr]"
              : "lg:grid-cols-[0.85fr_1.15fr]"
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

export function ServicesProcess() {
  const { process } = servicesPage;
  const total = process.stages.length;

  return (
    <div className="relative py-1">
      <div className="relative z-10">
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

          <header className="relative mb-2 flex w-full flex-col gap-2 text-left sm:mb-3">
            <p className="text-xs font-medium tracking-wide text-primary uppercase">
              Process
            </p>
            <div className="relative w-full">
              <span
                className="absolute top-1/2 left-0 z-10 hidden size-2.5 -translate-x-[4.5px] -translate-y-1/2 rounded-full bg-primary shadow-[0_0_12px_rgba(0,145,255,0.6)] lg:block lg:-left-10"
                aria-hidden
              />
              <h2 className="w-full text-[clamp(1.65rem,4vw+0.75rem,2.75rem)] font-medium tracking-tight leading-[1.15] text-balance">
                {process.title}
              </h2>
            </div>
            <p className="w-full text-sm leading-snug text-text-03 text-pretty sm:text-base md:text-lg">
              {process.subtitle}
            </p>
          </header>

          {process.stages.map((stage, i) => (
            <StageBlock
              key={stage.title}
              stage={stage}
              index={i}
              total={total}
              textOnLeft={i % 2 === 0}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
