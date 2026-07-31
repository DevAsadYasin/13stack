"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Check,
  BrainCircuit,
  Database,
  Sparkles,
  Monitor,
  Server,
  Cloud,
  Zap,
  Bot,
  Play,
  RefreshCw,
  type LucideIcon,
} from "lucide-react";
import { servicesPage } from "@/lib/mock-data";

const discFills = ["#071e33", "#0091ff", "#ffffff"] as const;
const iconFills = ["#ffffff", "#ffffff", "#0091ff"] as const;

const NODE_R = 24;
const ICON_SIZE = 17;
const ICON_BOX = 24;

function DiagramFlowPath({
  d,
  delay = 0,
  gradientId,
  active,
}: {
  d: string;
  delay?: number;
  gradientId: string;
  active: boolean;
}) {
  return (
    <g>
      <path
        d={d}
        fill="none"
        stroke="rgba(0,145,255,0.14)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <motion.path
        d={d}
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth="2.25"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={
          active ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }
        }
        transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
      />
      {active && (
        <>
          <circle r="3" fill="#0091ff" opacity="0.95">
            <animateMotion
              dur="2.6s"
              repeatCount="indefinite"
              path={d}
              begin={`${delay}s`}
            />
          </circle>
          <circle r="2" fill="#7cc8ff" opacity="0.75">
            <animateMotion
              dur="2.6s"
              repeatCount="indefinite"
              path={d}
              begin={`${delay + 0.85}s`}
            />
          </circle>
        </>
      )}
    </g>
  );
}

function NodeOrbits({
  x,
  y,
  r,
  blurId,
}: {
  x: number;
  y: number;
  r: number;
  blurId: string;
}) {
  return (
    <g aria-hidden>
      <circle
        cx={x}
        cy={y}
        r={r + 18}
        fill="rgba(0,145,255,0.12)"
        filter={`url(#${blurId})`}
      />
      <circle
        cx={x}
        cy={y}
        r={r + 14}
        fill="none"
        stroke="rgba(0,145,255,0.22)"
        strokeWidth="1"
        strokeDasharray="2 5"
      />
      <circle
        cx={x}
        cy={y}
        r={r + 8}
        fill="none"
        stroke="rgba(0,145,255,0.32)"
        strokeWidth="1"
        strokeDasharray="4 5"
      />
      <circle
        cx={x}
        cy={y}
        r={r + 3.5}
        fill="none"
        stroke="rgba(0,145,255,0.48)"
        strokeWidth="1.35"
      />
    </g>
  );
}

function GlowSvgNode({
  x,
  y,
  label,
  Icon,
  index,
  active,
  delay,
  blurId,
  textSide = "below",
}: {
  x: number;
  y: number;
  label: string;
  Icon: LucideIcon;
  index: number;
  active: boolean;
  delay: number;
  blurId: string;
  textSide?: "below" | "above" | "left" | "right";
}) {
  const fill = discFills[index % discFills.length];
  const iconFill = iconFills[index % iconFills.length];
  const r = NODE_R;

  let anchor: "start" | "middle" | "end" = "middle";
  let labelX = x;
  let labelY = y + r + 20;
  if (textSide === "above") {
    labelY = y - r - 16;
  } else if (textSide === "left") {
    anchor = "end";
    labelX = x - r - 16;
    labelY = y + 5;
  } else if (textSide === "right") {
    anchor = "start";
    labelX = x + r + 16;
    labelY = y + 5;
  }

  const half = ICON_BOX / 2;

  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.55 }}
      animate={active ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.55 }}
      transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformOrigin: `${x}px ${y}px` }}
    >
      <NodeOrbits x={x} y={y} r={r} blurId={blurId} />
      <circle
        cx={x}
        cy={y}
        r={r}
        fill={fill}
        style={{ filter: "drop-shadow(0 0 14px rgba(0,145,255,0.5))" }}
      />
      <foreignObject
        x={x - half}
        y={y - half}
        width={ICON_BOX}
        height={ICON_BOX}
      >
        <div className="flex h-full w-full items-center justify-center">
          <Icon size={ICON_SIZE} color={iconFill} strokeWidth={1.85} />
        </div>
      </foreignObject>
      <text
        x={labelX}
        y={labelY}
        textAnchor={anchor}
        fill="#e8e8e8"
        fontSize="14"
        fontWeight="600"
      >
        {label}
      </text>
    </motion.g>
  );
}

function SvgDefs({ id }: { id: string }) {
  return (
    <defs>
      <filter id={`${id}-blur`} x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="7" />
      </filter>
      <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="rgba(0,145,255,0.2)" />
        <stop offset="50%" stopColor="rgba(0,145,255,0.95)" />
        <stop offset="100%" stopColor="rgba(0,145,255,0.3)" />
      </linearGradient>
    </defs>
  );
}

function CircuitBackdrop({ width, height }: { width: number; height: number }) {
  const cols = Math.ceil(width / 28);
  const rows = Math.ceil(height / 28);
  return (
    <g opacity="0.35" aria-hidden>
      {Array.from({ length: rows + 1 }, (_, r) => (
        <line
          key={`h-${r}`}
          x1="0"
          y1={r * 28}
          x2={width}
          y2={r * 28}
          stroke="rgba(0,145,255,0.08)"
          strokeWidth="1"
        />
      ))}
      {Array.from({ length: cols + 1 }, (_, c) => (
        <line
          key={`v-${c}`}
          x1={c * 28}
          y1="0"
          x2={c * 28}
          y2={height}
          stroke="rgba(0,145,255,0.08)"
          strokeWidth="1"
        />
      ))}
      <path
        d={`M12 40 H80 V90 H140`}
        fill="none"
        stroke="rgba(0,145,255,0.12)"
        strokeWidth="1"
        strokeDasharray="2 6"
      />
      <path
        d={`M${width - 12} ${height - 36} H${width - 90} V${height - 80} H${width - 150}`}
        fill="none"
        stroke="rgba(0,145,255,0.12)"
        strokeWidth="1"
        strokeDasharray="2 6"
      />
      <circle cx="80" cy="40" r="2" fill="rgba(0,145,255,0.25)" />
      <circle
        cx={width - 90}
        cy={height - 36}
        r="2"
        fill="rgba(0,145,255,0.25)"
      />
    </g>
  );
}

function RagDiagram({ active }: { active: boolean }) {
  const grad = "diag-rag-grad";
  const nodes = [
    { x: 70, y: 108, label: "Model", Icon: BrainCircuit },
    { x: 200, y: 56, label: "RAG", Icon: Database },
    { x: 330, y: 108, label: "Output", Icon: Sparkles },
  ] as const;
  const paths = [
    `M${nodes[0].x + NODE_R} ${nodes[0].y} Q125 96 180 ${nodes[1].y + 12}`,
    `M${nodes[1].x + NODE_R} ${nodes[1].y} Q275 60 310 ${nodes[2].y - 8}`,
  ];

  return (
    <svg viewBox="0 0 400 170" className="h-auto w-full" aria-hidden>
      <SvgDefs id={grad} />
      <CircuitBackdrop width={400} height={170} />
      {paths.map((d, i) => (
        <DiagramFlowPath
          key={i}
          d={d}
          delay={0.35 + i * 0.2}
          gradientId={grad}
          active={active}
        />
      ))}
      {nodes.map((n, i) => (
        <GlowSvgNode
          key={n.label}
          x={n.x}
          y={n.y}
          label={n.label}
          Icon={n.Icon}
          index={i}
          active={active}
          delay={i * 0.13}
          blurId={`${grad}-blur`}
          textSide="above"
        />
      ))}
    </svg>
  );
}

function StackDiagram({ active }: { active: boolean }) {
  const grad = "diag-stack-grad";
  const nodes = [
    { x: 120, y: 58, label: "Frontend", Icon: Monitor },
    { x: 280, y: 58, label: "API", Icon: Server },
    { x: 120, y: 148, label: "Database", Icon: Database },
    { x: 280, y: 148, label: "Cloud", Icon: Cloud },
  ] as const;

  const paths = [
    `M${nodes[0].x + NODE_R} ${nodes[0].y} H${nodes[1].x - NODE_R}`,
    `M${nodes[1].x} ${nodes[1].y + NODE_R} V${nodes[3].y - NODE_R}`,
    `M${nodes[0].x} ${nodes[0].y + NODE_R} V${nodes[2].y - NODE_R}`,
    `M${nodes[2].x + NODE_R} ${nodes[2].y} H${nodes[3].x - NODE_R}`,
  ];

  return (
    <svg
      viewBox="0 0 400 212"
      className="h-auto w-full overflow-visible"
      aria-hidden
    >
      <SvgDefs id={grad} />
      <CircuitBackdrop width={400} height={212} />
      {paths.map((d, i) => (
        <DiagramFlowPath
          key={i}
          d={d}
          delay={0.35 + i * 0.12}
          gradientId={grad}
          active={active}
        />
      ))}
      {nodes.map((n, i) => (
        <GlowSvgNode
          key={n.label}
          x={n.x}
          y={n.y}
          label={n.label}
          Icon={n.Icon}
          index={i}
          active={active}
          delay={i * 0.1}
          blurId={`${grad}-blur`}
          textSide={i < 2 ? "above" : "below"}
        />
      ))}
    </svg>
  );
}

function CycleDiagram({ active }: { active: boolean }) {
  const grad = "diag-cycle-grad";
  const cx = 200;
  const cy = 136;
  const R = 72;
  const nodes = [
    { a: -90, label: "Trigger", Icon: Zap },
    { a: 30, label: "Agent", Icon: Bot },
    { a: 150, label: "Action", Icon: Play },
  ].map((n, i) => {
    const rad = (n.a * Math.PI) / 180;
    return {
      ...n,
      x: cx + Math.cos(rad) * R,
      y: cy + Math.sin(rad) * R,
      index: i,
    };
  });

  const arc = (a: (typeof nodes)[0], b: (typeof nodes)[0]) => {
    const mx = (a.x + b.x) / 2;
    const my = (a.y + b.y) / 2;
    const ox = (mx - cx) * 0.28;
    const oy = (my - cy) * 0.28;
    return `M${a.x} ${a.y} Q${mx + ox} ${my + oy} ${b.x} ${b.y}`;
  };

  const paths = [
    arc(nodes[0], nodes[1]),
    arc(nodes[1], nodes[2]),
    arc(nodes[2], nodes[0]),
  ];

  return (
    <svg
      viewBox="0 0 400 248"
      className="h-auto w-full overflow-visible"
      aria-hidden
    >
      <SvgDefs id={grad} />
      <CircuitBackdrop width={400} height={248} />
      <circle
        cx={cx}
        cy={cy}
        r={R + 22}
        fill="none"
        stroke="rgba(0,145,255,0.1)"
        strokeWidth="1"
        strokeDasharray="2 7"
      />
      <circle
        cx={cx}
        cy={cy}
        r={R + 10}
        fill="none"
        stroke="rgba(0,145,255,0.16)"
        strokeWidth="1.25"
        strokeDasharray="5 6"
      />
      <circle
        cx={cx}
        cy={cy}
        r={R}
        fill="none"
        stroke="rgba(0,145,255,0.22)"
        strokeWidth="1.5"
      />
      <circle
        cx={cx}
        cy={cy}
        r={R - 16}
        fill="rgba(0,145,255,0.04)"
        stroke="rgba(0,145,255,0.14)"
        strokeWidth="1"
      />
      <motion.g
        initial={{ opacity: 0, scale: 0.6 }}
        animate={active ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
        transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: `${cx}px ${cy}px` }}
      >
        <circle
          cx={cx}
          cy={cy}
          r={28}
          fill="rgba(0,145,255,0.18)"
          filter={`url(#${grad}-blur)`}
        />
        <circle
          cx={cx}
          cy={cy}
          r={20}
          fill="#0091ff"
          style={{ filter: "drop-shadow(0 0 16px rgba(0,145,255,0.55))" }}
        />
        <circle
          cx={cx}
          cy={cy}
          r={24}
          fill="none"
          stroke="rgba(255,255,255,0.25)"
          strokeWidth="1"
          strokeDasharray="3 4"
        />
        <foreignObject x={cx - 11} y={cy - 11} width="22" height="22">
          <div className="flex h-full w-full items-center justify-center">
            <RefreshCw size={15} color="#ffffff" strokeWidth={2} />
          </div>
        </foreignObject>
      </motion.g>

      {paths.map((d, i) => (
        <DiagramFlowPath
          key={i}
          d={d}
          delay={0.4 + i * 0.18}
          gradientId={grad}
          active={active}
        />
      ))}
      {nodes.map((n) => (
        <GlowSvgNode
          key={n.label}
          x={n.x}
          y={n.y}
          label={n.label}
          Icon={n.Icon}
          index={n.index}
          active={active}
          delay={0.2 + n.index * 0.13}
          blurId={`${grad}-blur`}
          textSide="above"
        />
      ))}
    </svg>
  );
}

function Diagram({
  type,
  active,
}: {
  type: "rag" | "stack" | "cycle";
  active: boolean;
}) {
  if (type === "rag") return <RagDiagram active={active} />;
  if (type === "stack") return <StackDiagram active={active} />;
  return <CycleDiagram active={active} />;
}

function DiveHeader({
  dive,
  inView,
}: {
  dive: (typeof servicesPage.deepDives)[number];
  inView: boolean;
}) {
  return (
    <motion.div
      className="flex w-full flex-col gap-3 text-left"
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.12, delayChildren: 0.04 } },
      }}
    >
      <div className="relative w-full">
        <span
          className="absolute top-1/2 left-0 z-10 hidden size-2.5 -translate-x-[4.5px] -translate-y-1/2 rounded-full bg-primary shadow-[0_0_12px_rgba(0,145,255,0.6)] lg:block lg:-left-10"
          aria-hidden
        />
        <motion.h2
          className="w-full text-[clamp(1.55rem,4vw+0.7rem,2.75rem)] font-medium tracking-tight leading-[1.15] text-balance"
          variants={{
            hidden: { opacity: 0, y: 22 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
            },
          }}
        >
          {dive.title}
        </motion.h2>
      </div>
      <motion.p
        className="w-full text-base leading-snug text-text-03 text-pretty sm:text-lg lg:text-xl"
        variants={{
          hidden: { opacity: 0, y: 16 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
          },
        }}
      >
        {dive.description}
      </motion.p>
    </motion.div>
  );
}

function TextColumn({
  dive,
  textOnLeft,
  inView,
}: {
  dive: (typeof servicesPage.deepDives)[number];
  textOnLeft: boolean;
  inView: boolean;
}) {
  return (
    <motion.div
      className="flex w-full min-w-0 flex-col gap-3"
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } },
      }}
    >
      <ol className="flex w-full flex-col gap-3">
        {dive.steps.map((step, i) => (
          <motion.li
            key={step.title}
            className="flex w-full gap-3"
            variants={{
              hidden: { opacity: 0, y: 20, x: textOnLeft ? -12 : 12 },
              visible: {
                opacity: 1,
                y: 0,
                x: 0,
                transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
              },
            }}
          >
            <span
              className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/15 text-sm font-semibold text-primary"
              aria-hidden
            >
              {i + 1}
            </span>
            <div className="flex min-w-0 flex-1 flex-col gap-1">
              <span className="w-full text-base font-semibold tracking-tight text-white sm:text-lg">
                {step.title}
              </span>
              <p className="w-full text-[15px] leading-relaxed text-text-03 text-pretty sm:text-base">
                {step.body}
              </p>
            </div>
          </motion.li>
        ))}
      </ol>

      <ul className="mt-1 flex w-full flex-col gap-1.5">
        {dive.deliverables.map((item) => (
          <motion.li
            key={item}
            className="flex w-full items-start gap-2.5 text-[15px] leading-snug text-text-02 sm:text-base"
            variants={{
              hidden: { opacity: 0, y: 12 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
              },
            }}
          >
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
              <Check size={12} strokeWidth={2.5} />
            </span>
            <span className="min-w-0 flex-1">{item}</span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}

function DiagramColumn({
  dive,
  textOnLeft,
  inView,
}: {
  dive: (typeof servicesPage.deepDives)[number];
  textOnLeft: boolean;
  inView: boolean;
}) {
  return (
    <motion.div
      className="relative mx-auto flex w-full min-w-0 max-w-md items-center justify-center overflow-visible scale-100 sm:max-w-lg sm:scale-[1.02] lg:mx-0 lg:max-w-none lg:scale-[1.06]"
      initial={{ opacity: 0, x: textOnLeft ? 36 : -36, y: 16 }}
      animate={
        inView
          ? { opacity: 1, x: 0, y: 0 }
          : { opacity: 0, x: textOnLeft ? 36 : -36, y: 16 }
      }
      transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
    >
      <Diagram type={dive.diagram} active={inView} />
    </motion.div>
  );
}

function DeepDiveBlock({
  dive,
  index,
  sectionActive,
}: {
  dive: (typeof servicesPage.deepDives)[number];
  index: number;
  sectionActive: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, {
    once: false,
    amount: 0.18,
    margin: "0px 0px -4% 0px",
  });
  const active = sectionActive && inView;
  const textOnLeft = index % 2 === 0;

  const text = (
    <TextColumn dive={dive} textOnLeft={textOnLeft} inView={active} />
  );
  const diagram = (
    <DiagramColumn dive={dive} textOnLeft={textOnLeft} inView={active} />
  );

  return (
    <article
      ref={ref}
      id={dive.id}
      className="relative scroll-mt-28 overflow-x-clip py-6 sm:scroll-mt-32 sm:py-8 lg:overflow-visible lg:py-10"
    >
      <div
        className={`pointer-events-none absolute top-1/2 h-[180px] w-[180px] -translate-y-1/2 rounded-full bg-primary/10 blur-[70px] sm:h-[240px] sm:w-[240px] sm:blur-[90px] lg:h-[280px] lg:w-[280px] ${
          textOnLeft ? "right-0 translate-x-1/4" : "left-0 -translate-x-1/4"
        }`}
        aria-hidden
      />

      <motion.div
        className="relative z-10 flex flex-col gap-4 sm:gap-6 lg:gap-8"
        initial={{ opacity: 0 }}
        animate={sectionActive ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.35 }}
      >
        <DiveHeader dive={dive} inView={active} />
        <div
          className={`grid w-full grid-cols-1 items-start gap-5 sm:gap-6 lg:items-center lg:gap-8 ${
            textOnLeft
              ? "lg:grid-cols-[1.1fr_0.9fr]"
              : "lg:grid-cols-[0.9fr_1.1fr]"
          }`}
        >
          <div className={`min-w-0 ${textOnLeft ? "" : "lg:order-2"}`}>
            {text}
          </div>
          <div className={`min-w-0 ${textOnLeft ? "" : "lg:order-1"}`}>
            {diagram}
          </div>
        </div>
      </motion.div>
    </article>
  );
}

export function ServiceDeepDiveList({ active }: { active: boolean }) {
  const { overview } = servicesPage;

  return (
    <div className="relative lg:pl-10">
      <div
        className="pointer-events-none absolute top-0 bottom-8 left-0 hidden w-px bg-white/10 lg:block"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute top-0 bottom-8 left-0 hidden w-px bg-primary/30 lg:block"
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

      {servicesPage.deepDives.map((dive, i) => (
        <DeepDiveBlock
          key={dive.id}
          dive={dive}
          index={i}
          sectionActive={active}
        />
      ))}
    </div>
  );
}
