"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Building2,
  Handshake,
  Rocket,
  Users,
  type LucideIcon,
} from "lucide-react";
import { aboutPage } from "@/lib/mock-data";

const icons: Record<string, LucideIcon> = {
  ceo: Building2,
  team: Users,
  base: Handshake,
  ship: Rocket,
};

const layout = [
  { rotate: -10, x: "0%", y: "8%" },
  { rotate: -2, x: "14%", y: "0%" },
  { rotate: 5, x: "2%", y: "28%" },
  { rotate: 11, x: "16%", y: "38%" },
];

export function HeroAboutVisual() {
  const cards = aboutPage.heroCards;
  const [order, setOrder] = useState(() => cards.map((_, i) => i));

  const bringToFront = (index: number) => {
    setOrder((prev) => {
      if (prev[prev.length - 1] === index) return prev;
      return [...prev.filter((i) => i !== index), index];
    });
  };

  const cycleNext = () => {
    setOrder((prev) => {
      const [first, ...rest] = prev;
      return [...rest, first];
    });
  };

  return (
    <div className="relative mx-auto aspect-[4/5] w-full max-w-[22rem] sm:aspect-[5/4] xl:max-w-[24rem]">
      {cards.map((card, i) => {
        const frame = layout[i];
        const Icon = icons[card.id] ?? Building2;
        const stackIndex = order.indexOf(i);
        const isFront = stackIndex === order.length - 1;

        return (
          <motion.button
            key={card.id}
            type="button"
            aria-label={`${card.title}. Click to bring forward.`}
            aria-pressed={isFront}
            onClick={() => bringToFront(i)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                bringToFront(i);
              }
            }}
            className="absolute w-[78%] cursor-pointer rounded-2xl border border-white/12 bg-card-bg p-4 text-left shadow-[0_16px_40px_rgba(0,0,0,0.4)] outline-none focus-visible:ring-2 focus-visible:ring-primary/50 sm:p-5"
            style={{
              left: frame.x,
              top: frame.y,
              zIndex: 10 + stackIndex,
            }}
            initial={{ opacity: 0, y: 28, rotate: frame.rotate - 6 }}
            animate={{
              opacity: 1,
              y: 0,
              rotate: frame.rotate,
              scale: isFront ? 1.02 : 1,
            }}
            whileHover={{
              y: -6,
              scale: 1.03,
              borderColor: "rgba(0,145,255,0.35)",
            }}
            whileTap={{ scale: 0.98 }}
            transition={{
              duration: 0.35,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="flex items-start gap-3">
              <span
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border text-primary transition-colors ${
                  isFront
                    ? "border-primary/45 bg-primary/15"
                    : "border-primary/30 bg-primary/10"
                }`}
              >
                <Icon size={18} strokeWidth={1.75} />
              </span>
              <div className="min-w-0">
                <p className="text-[10px] font-medium tracking-wide text-primary uppercase">
                  {card.eyebrow}
                </p>
                <p className="mt-1 text-base font-semibold tracking-tight text-white sm:text-lg">
                  {card.title}
                </p>
                <p className="mt-1.5 text-xs leading-relaxed text-pretty text-text-03 sm:text-[13px]">
                  {card.line}
                </p>
              </div>
            </div>
          </motion.button>
        );
      })}

      <button
        type="button"
        onClick={cycleNext}
        className="absolute right-0 bottom-0 z-40 rounded-full border border-white/12 bg-[#0d0d0d]/90 px-3 py-1.5 text-[11px] font-medium text-text-03 backdrop-blur transition-colors hover:border-primary/35 hover:text-white"
      >
        Swap
      </button>
    </div>
  );
}
