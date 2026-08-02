"use client";

import { Mail, Calendar, MessageCircle, BarChart3, Zap } from "lucide-react";
import { Globe } from "@/components/Globe";

const icons = [
  {
    Icon: Mail,
    angle: 200,
    diameter: 112,
    size: 42,
    bg: "bg-bg-brown",
    color: "text-white",
    duration: 7,
    reverse: false,
  },
  {
    Icon: MessageCircle,
    angle: 236,
    diameter: 120,
    size: 36,
    bg: "bg-bg-primary",
    color: "text-text-02",
    duration: 8.5,
    reverse: true,
  },
  {
    Icon: BarChart3,
    angle: 272,
    diameter: 114,
    size: 56,
    bg: "bg-bg-brown",
    color: "text-white",
    duration: 6.5,
    reverse: false,
  },
  {
    Icon: Calendar,
    angle: 308,
    diameter: 122,
    size: 56,
    bg: "bg-primary",
    color: "text-white",
    duration: 9,
    reverse: true,
  },
  {
    Icon: Zap,
    angle: 344,
    diameter: 110,
    size: 44,
    bg: "bg-white",
    color: "text-primary",
    duration: 6,
    reverse: false,
  },
] as const;

type IconConfig = (typeof icons)[number];

function OrbitIcon({
  Icon,
  angle,
  diameter,
  size,
  bg,
  color,
  duration,
  reverse,
}: IconConfig) {
  return (
    <div
      className="absolute inset-0"
      style={{ transform: `rotate(${angle}deg)` }}
    >
      <div
        className="absolute top-1/2 left-1/2"
        style={{
          width: `${diameter}%`,
          height: `${diameter}%`,
          animation: `${reverse ? "orbit-ccw" : "orbit-cw"} ${duration}s ease-in-out infinite alternate`,
        }}
      >
        <div
          className="pointer-events-auto absolute top-1/2 right-0"
          style={{
            animation: `${reverse ? "counter-ccw" : "counter-cw"} ${duration}s ease-in-out infinite alternate`,
          }}
        >
          <div style={{ transform: `rotate(${-angle}deg)` }}>
            <div
              className={`flex items-center justify-center rounded-full shadow-[0_0_24px_rgba(0,145,255,0.35)] ${bg}`}
              style={{ width: size, height: size }}
            >
              <Icon className={color} size={size * 0.38} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function HeroGlobeVisual() {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center">
      <div className="relative size-[min(82vw,clamp(15.5rem,36vmin,28rem))] translate-y-[46%] sm:size-[min(88vw,clamp(18rem,42vw,31.625rem))]">
        <div
          className="absolute bottom-[10%] left-1/2 h-[55%] w-[55%] -translate-x-1/2 rounded-full bg-primary/70 blur-[70px]"
          aria-hidden
        />
        <div
          className="absolute bottom-[22%] left-1/2 h-[32%] w-[32%] -translate-x-1/2 rounded-full bg-primary/80 blur-[50px]"
          aria-hidden
        />
        <div
          className="absolute top-[2%] left-1/2 h-[34%] w-[34%] -translate-x-1/2 rounded-full bg-primary/35 blur-[60px]"
          aria-hidden
        />

        <Globe className="pointer-events-auto" />

        <div
          className="absolute top-1/2 left-1/2 h-[128%] w-[128%] -translate-x-1/2 -translate-y-1/2 rounded-full border-[1.5px] border-primary/35"
          aria-hidden
        />
        <div
          className="animate-spin-slow absolute top-1/2 left-1/2 h-[152%] w-[152%] -translate-x-1/2 -translate-y-1/2 rounded-full border-[1.5px] border-dashed border-primary/20"
          aria-hidden
        />
        <div
          className="absolute top-1/2 left-1/2 h-[178%] w-[178%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10"
          style={{ animation: "spin-slow 100s linear infinite reverse" }}
          aria-hidden
        />

        {icons.map((icon, i) => (
          <OrbitIcon key={i} {...icon} />
        ))}
      </div>
    </div>
  );
}
