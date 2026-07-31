"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Cpu, Layers2, RefreshCw, Rocket, type LucideIcon } from "lucide-react";
import { servicesPage } from "@/lib/mock-data";

const icons: Record<string, LucideIcon> = {
  "ai-ml": Cpu,
  fullstack: Layers2,
  automation: RefreshCw,
};

const paths = servicesPage.heroCards.filter((card) => card.id !== "ship");

const VB = { w: 340, h: 150 };
const startX = 92;
const mergeX = 200;
const mergeY = 75;
const rowY = [26, 75, 124];

function pathD(y: number) {
  return `M ${startX} ${y} C ${startX + 36} ${y}, ${mergeX - 24} ${mergeY}, ${mergeX} ${mergeY}`;
}

export function HeroServicesVisual() {
  const [active, setActive] = useState(1);
  const current = paths[active];
  const ActiveIcon = icons[current.id] ?? Cpu;

  return (
    <div className="relative mx-auto w-full max-w-[22rem] sm:max-w-[24rem]">
      <div className="relative aspect-[340/150] w-full">
        <svg
          viewBox={`0 0 ${VB.w} ${VB.h}`}
          className="absolute inset-0 h-full w-full overflow-visible"
          fill="none"
          aria-hidden
        >
          {paths.map((path, i) => (
            <path
              key={`${path.id}-idle`}
              d={pathD(rowY[i])}
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          ))}

          <motion.path
            key={current.id}
            d={pathD(rowY[active])}
            stroke="#0091ff"
            strokeWidth="2.25"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0.35 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          />

          <line
            x1={mergeX}
            y1={mergeY}
            x2={258}
            y2={mergeY}
            stroke="#0091ff"
            strokeWidth="2.25"
            strokeLinecap="round"
          />

          <circle
            cx={mergeX}
            cy={mergeY}
            r="5"
            fill="#0a0a0a"
            stroke="#0091ff"
            strokeWidth="1.75"
          />
          <circle cx={mergeX} cy={mergeY} r="2" fill="#0091ff" />
        </svg>
        {paths.map((path, i) => {
          const Icon = icons[path.id] ?? Cpu;
          const isActive = i === active;
          const top = `${(rowY[i] / VB.h) * 100}%`;

          return (
            <button
              key={path.id}
              type="button"
              onClick={() => setActive(i)}
              aria-pressed={isActive}
              aria-label={path.title}
              className={`absolute left-0 flex -translate-y-1/2 items-center gap-1.5 rounded-full border py-1 pr-2.5 pl-1 transition-all ${
                isActive
                  ? "border-primary/55 bg-primary/15"
                  : "border-white/12 bg-card-bg hover:border-white/25"
              }`}
              style={{ top }}
            >
              <span
                className={`flex h-6 w-6 items-center justify-center rounded-full ${
                  isActive
                    ? "bg-primary text-white"
                    : "bg-white/[0.05] text-primary"
                }`}
              >
                <Icon size={12} strokeWidth={2} />
              </span>
              <span
                className={`text-[11px] font-semibold tracking-tight whitespace-nowrap sm:text-xs ${
                  isActive ? "text-white" : "text-text-02"
                }`}
              >
                {path.title}
              </span>
            </button>
          );
        })}
        <motion.div
          className="absolute top-1/2 right-0 flex -translate-y-1/2 items-center gap-2 rounded-full border border-primary/40 bg-primary py-2 pr-3.5 pl-2 shadow-[0_0_28px_rgba(0,145,255,0.35)]"
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-white">
            <Rocket size={15} strokeWidth={2.1} />
          </span>
          <span className="leading-tight">
            <span className="block text-sm font-bold tracking-tight text-white">
              Ship
            </span>
            <span className="block text-[10px] font-medium tracking-wide text-white/80 uppercase">
              live
            </span>
          </span>
        </motion.div>
      </div>

      <div className="mt-2.5 flex items-center gap-2">
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-primary">
          <ActiveIcon size={12} />
        </span>
        <AnimatePresence mode="wait">
          <motion.p
            key={current.id}
            className="min-w-0 text-xs leading-snug text-pretty text-text-03 sm:text-sm"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -3 }}
            transition={{ duration: 0.2 }}
          >
            <span className="font-medium text-white">{current.title}</span>
            {" · "}
            {current.line}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
