"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  DraftingCompass,
  Layers2,
  BrainCircuit,
  Workflow,
  Cloud,
  Database,
  Sparkles,
  Bot,
  GitBranch,
  Monitor,
  Server,
  Network,
  Map,
  Cable,
  ShieldCheck,
  FlaskConical,
  Cpu,
  Cog,
  Target,
  Box,
  Binary,
  MessageSquareText,
  BadgeCheck,
  type LucideIcon,
} from "lucide-react";
import { howWeBuild } from "@/lib/mock-data";
import { Button } from "@/components/ui/Button";

const CONVERGENCE_COMPLETE_DELAY = 2.2;

const iconMap: Record<string, LucideIcon> = {
  planning: DraftingCompass,
  layers: Layers2,
  ai: BrainCircuit,
  ml: Cpu,
  genai: Sparkles,
  automation: Workflow,
  cloud: Cloud,
  database: Database,
  sparkles: Sparkles,
  brain: BrainCircuit,
  bot: Bot,
  cicd: GitBranch,
  monitor: Monitor,
  server: Server,
  network: Network,
  map: Map,
  plug: Cable,
  shield: ShieldCheck,
  flask: FlaskConical,
  train: Cog,
  evaluate: Target,
  serve: Box,
  embed: Binary,
  prompt: MessageSquareText,
  orchestrate: Workflow,
  ready: BadgeCheck,
};

const discFills = ["#071e33", "#0091ff", "#ffffff"] as const;
const iconFills = ["#ffffff", "#ffffff", "#0091ff"] as const;

type Pt = { x: number; y: number };

function FlowPath({
  d,
  delay = 0,
  gradientId,
  drawn,
}: {
  d: string;
  delay?: number;
  gradientId: string;
  drawn: boolean;
}) {
  return (
    <g>
      <path
        d={d}
        fill="none"
        stroke="rgba(0,145,255,0.14)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <motion.path
        d={d}
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={
          drawn ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }
        }
        transition={{ duration: 1.15, delay, ease: [0.22, 1, 0.36, 1] }}
      />
      {drawn && (
        <>
          <circle r="3" fill="#0091ff" opacity="0.95">
            <animateMotion
              dur="3.2s"
              repeatCount="indefinite"
              path={d}
              begin={`${delay}s`}
            />
          </circle>
          <circle r="2" fill="#7cc8ff" opacity="0.7">
            <animateMotion
              dur="3.2s"
              repeatCount="indefinite"
              path={d}
              begin={`${delay + 1.05}s`}
            />
          </circle>
        </>
      )}
    </g>
  );
}

function edgePoint(from: Pt, to: Pt, radius: number): Pt {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const len = Math.hypot(dx, dy) || 1;
  return { x: from.x + (dx / len) * radius, y: from.y + (dy / len) * radius };
}

function smoothPath(centers: Pt[], radii: number[]): string {
  if (centers.length < 2) return "";
  const pts = centers.map((c) => ({ ...c }));
  pts[0] = edgePoint(centers[0], centers[1], radii[0] ?? 0);
  const last = centers.length - 1;
  pts[last] = edgePoint(centers[last], centers[last - 1], radii[last] ?? 0);

  let d = `M${pts[0].x.toFixed(2)} ${pts[0].y.toFixed(2)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const a = pts[i];
    const b = pts[i + 1];
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const dist = Math.hypot(dx, dy) || 1;
    const handle = Math.min(Math.max(32, dist * 0.38), dist * 0.5);

    let c1x: number;
    let c1y: number;
    let c2x: number;
    let c2y: number;

    if (Math.abs(dx) >= Math.abs(dy) * 1.15) {
      const hx = Math.sign(dx || 1) * handle;
      c1x = a.x + hx;
      c1y = a.y;
      c2x = b.x - hx;
      c2y = b.y;
    } else {
      const ux = dx / dist;
      const uy = dy / dist;
      c1x = a.x + ux * handle;
      c1y = a.y + uy * handle;
      c2x = b.x - ux * handle;
      c2y = b.y - uy * handle;
    }

    d += ` C${c1x.toFixed(2)} ${c1y.toFixed(2)}, ${c2x.toFixed(2)} ${c2y.toFixed(2)}, ${b.x.toFixed(2)} ${b.y.toFixed(2)}`;
  }
  return d;
}

function radiusFor(kind: "start" | "hub" | "step" | "merge" | "end") {
  if (kind === "end") return 44;
  if (kind === "merge") return 38;
  if (kind === "start" || kind === "hub") return 34;
  return 28;
}

function NodeDisc({
  icon,
  index,
  final = false,
  hub = false,
  merge = false,
}: {
  icon: string;
  index: number;
  final?: boolean;
  hub?: boolean;
  merge?: boolean;
}) {
  const Icon = icon !== "logo" ? iconMap[icon] : undefined;
  const shell = final
    ? "size-[5.5rem]"
    : merge
      ? "size-[4.75rem]"
      : hub
        ? "size-[4.25rem]"
        : "size-[3.5rem]";
  const disc = final
    ? "size-[4.25rem]"
    : merge
      ? "size-[3.5rem]"
      : hub
        ? "size-[3.15rem]"
        : "size-[2.6rem]";
  const iconPx = final ? 28 : merge ? 22 : hub ? 18 : 15;
  const fill = final || merge ? "#0091ff" : discFills[index % discFills.length];

  return (
    <div className={`relative flex items-center justify-center ${shell}`}>
      <div
        className="absolute inset-[10%] rounded-full border border-dashed border-primary/20"
        aria-hidden
      />
      <div
        className={`relative z-10 flex items-center justify-center rounded-full ${disc}`}
        style={{
          background: fill,
          boxShadow:
            final || merge
              ? "0 0 12px rgba(0,145,255,0.28)"
              : hub
                ? "0 0 8px rgba(0,145,255,0.2)"
                : "none",
        }}
      >
        {icon === "logo" ? (
          <Image
            src="/assets/svg/13stack-mark-white.svg"
            alt=""
            width={30}
            height={30}
            className="h-auto w-[55%]"
          />
        ) : Icon ? (
          <Icon
            size={iconPx}
            color={
              final || merge ? "#fff" : iconFills[index % iconFills.length]
            }
            strokeWidth={1.85}
          />
        ) : null}
      </div>
    </div>
  );
}

type PlacedNode = {
  key: string;
  x: number;
  y: number;
  title: string;
  icon: string;
  index: number;
  delay: number;
  final?: boolean;
  hub?: boolean;
  merge?: boolean;
};

export function MultiPathBuildFlow({
  cta,
}: {
  cta?: { label: string; href: string };
} = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [ctaDelay, setCtaDelay] = useState(CONVERGENCE_COMPLETE_DELAY);
  const { start, branches, end } = howWeBuild;

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1280px)");
    const sync = () =>
      setCtaDelay(mq.matches ? CONVERGENCE_COMPLETE_DELAY : 0.45);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const aiBranch = branches.find((b) => "subPaths" in b && b.subPaths);
  const simpleBranches = branches.filter(
    (b) => !("subPaths" in b && b.subPaths),
  );
  const W = 1280;
  const H = 620;
  const COL = {
    start: 70,
    branch: 195,
    sub: 310,
    steps: [430, 545, 660, 775, 890] as const,
    join: 1025,
    prod: 1200,
  } as const;

  const ROW = {
    ml: 95,
    genai: 230,
    stack: 385,
    auto: 530,
  } as const;
  const aiHubY = (ROW.ml + ROW.genai) / 2;
  const startPt = { x: COL.start, y: (aiHubY + ROW.stack + ROW.auto) / 3 };
  const endPt = { x: COL.prod, y: startPt.y };
  const R = {
    start: radiusFor("start"),
    hub: radiusFor("hub"),
    step: radiusFor("step"),
    merge: radiusFor("merge"),
    end: radiusFor("end"),
  };

  const nodes: PlacedNode[] = [
    {
      key: "start",
      x: startPt.x,
      y: startPt.y,
      title: start.title,
      icon: start.icon,
      index: 0,
      hub: true,
      delay: 0,
    },
  ];
  const paths: { d: string; delay: number }[] = [];
  if (
    aiBranch &&
    "subPaths" in aiBranch &&
    aiBranch.subPaths &&
    aiBranch.merge
  ) {
    nodes.push({
      key: "hub-ai-ml",
      x: COL.branch,
      y: aiHubY,
      title: aiBranch.title,
      icon: aiBranch.icon,
      index: 1,
      hub: true,
      delay: 0.1,
    });
    paths.push({
      d: smoothPath([startPt, { x: COL.branch, y: aiHubY }], [R.start, R.hub]),
      delay: 0.08,
    });

    const mergePt = { x: COL.join, y: aiHubY };
    nodes.push({
      key: "merge-ai",
      x: mergePt.x,
      y: mergePt.y,
      title: aiBranch.merge.title,
      icon: aiBranch.merge.icon,
      index: 2,
      merge: true,
      delay: 0.78,
    });

    aiBranch.subPaths.forEach((sub, si) => {
      const y = si === 0 ? ROW.ml : ROW.genai;
      const subPt = { x: COL.sub, y };
      nodes.push({
        key: `sub-${sub.id}`,
        x: subPt.x,
        y: subPt.y,
        title: sub.title,
        icon: sub.icon,
        index: 3 + si,
        hub: true,
        delay: 0.18 + si * 0.06,
      });
      paths.push({
        d: smoothPath([{ x: COL.branch, y: aiHubY }, subPt], [R.hub, R.hub]),
        delay: 0.16 + si * 0.06,
      });

      const lane: Pt[] = [subPt, ...COL.steps.map((x) => ({ x, y })), mergePt];
      const laneR = [R.hub, ...COL.steps.map(() => R.step), R.merge];
      paths.push({
        d: smoothPath(lane, laneR),
        delay: 0.28 + si * 0.08,
      });

      sub.steps.forEach((step, ti) => {
        nodes.push({
          key: `${sub.id}-${ti}`,
          x: COL.steps[ti] ?? COL.steps[COL.steps.length - 1],
          y,
          title: step.title,
          icon: step.icon,
          index: 5 + si * 5 + ti,
          delay: 0.3 + si * 0.06 + ti * 0.05,
        });
      });
    });

    paths.push({
      d: smoothPath([mergePt, endPt], [R.merge, R.end]),
      delay: 0.9,
    });
  }
  const simpleYs = [ROW.stack, ROW.auto];
  simpleBranches.forEach((branch, bi) => {
    if (!("steps" in branch) || !branch.steps) return;
    const y = simpleYs[bi] ?? ROW.stack;
    const hubPt = { x: COL.branch, y };
    nodes.push({
      key: `hub-${branch.id}`,
      x: hubPt.x,
      y: hubPt.y,
      title: branch.title,
      icon: branch.icon,
      index: 10 + bi,
      hub: true,
      delay: 0.14 + bi * 0.08,
    });
    paths.push({
      d: smoothPath([startPt, hubPt], [R.start, R.hub]),
      delay: 0.1 + bi * 0.08,
    });

    const stepPts = COL.steps.map((x) => ({ x, y }));
    const joinPt = { x: COL.join, y };
    paths.push({
      d: smoothPath(
        [hubPt, ...stepPts, joinPt],
        [R.hub, ...COL.steps.map(() => R.step), 0],
      ),
      delay: 0.26 + bi * 0.08,
    });
    paths.push({
      d: smoothPath([joinPt, endPt], [0, R.end]),
      delay: 0.85 + bi * 0.05,
    });

    branch.steps.forEach((step, ti) => {
      nodes.push({
        key: `${branch.id}-${ti}`,
        x: COL.steps[ti] ?? COL.steps[COL.steps.length - 1],
        y,
        title: step.title,
        icon: step.icon,
        index: 12 + bi * 6 + ti,
        delay: 0.32 + bi * 0.06 + ti * 0.05,
      });
    });
  });

  nodes.push({
    key: "end",
    x: endPt.x,
    y: endPt.y,
    title: end.title,
    icon: end.icon,
    index: 0,
    final: true,
    delay: 0.98,
  });

  const grad = "flow-multipath";

  return (
    <div ref={ref} className="w-full">
      <div
        className="relative hidden w-full xl:block"
        style={{ aspectRatio: `${W} / ${H}` }}
      >
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox={`0 0 ${W} ${H}`}
          fill="none"
          preserveAspectRatio="none"
          aria-hidden
        >
          <defs>
            <linearGradient id={grad} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(0,145,255,0.2)" />
              <stop offset="50%" stopColor="rgba(0,145,255,0.95)" />
              <stop offset="100%" stopColor="rgba(0,145,255,0.35)" />
            </linearGradient>
          </defs>
          {paths.map((p, i) => (
            <FlowPath
              key={i}
              d={p.d}
              delay={p.delay}
              gradientId={grad}
              drawn={inView}
            />
          ))}
        </svg>

        {nodes.map((node) => (
          <div
            key={node.key}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${(node.x / W) * 100}%`,
              top: `${(node.y / H) * 100}%`,
            }}
          >
            <motion.div
              className="relative flex flex-col items-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={
                inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
              }
              transition={{
                duration: 0.45,
                delay: node.delay,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <NodeDisc
                icon={node.icon}
                index={node.index}
                final={node.final}
                hub={node.hub}
                merge={node.merge}
              />
              <p
                className={`absolute top-full left-1/2 w-[6.5rem] -translate-x-1/2 pt-2 text-center text-[10px] leading-tight font-medium tracking-tight ${
                  node.final || node.merge ? "text-primary" : "text-white/90"
                }`}
              >
                {node.title}
              </p>
            </motion.div>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-6 xl:hidden">
        <div className="flex flex-col items-center gap-2">
          <NodeDisc icon={start.icon} index={0} hub />
          <p className="text-xs font-medium text-white/90">{start.title}</p>
        </div>

        {aiBranch &&
          "subPaths" in aiBranch &&
          aiBranch.subPaths &&
          aiBranch.merge && (
            <div className="rounded-2xl border border-white/10 bg-card-bg/40 p-4">
              <div className="mb-4 flex items-center gap-2.5">
                <NodeDisc icon={aiBranch.icon} index={1} hub />
                <p className="text-sm font-medium text-white">
                  {aiBranch.title}
                </p>
              </div>
              <div className="flex flex-col gap-4">
                {aiBranch.subPaths.map((sub, si) => (
                  <div key={sub.id}>
                    <p className="mb-2 text-[11px] font-semibold tracking-wide text-primary uppercase">
                      {sub.title}
                    </p>
                    <div className="flex gap-2 overflow-x-auto pb-1">
                      {sub.steps.map((step, ti) => (
                        <div
                          key={step.title}
                          className="flex w-[4.5rem] shrink-0 flex-col items-center gap-1"
                        >
                          <NodeDisc icon={step.icon} index={si + ti} />
                          <p className="text-center text-[9px] leading-tight text-white/90">
                            {step.title}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex flex-col items-center gap-1.5">
                <NodeDisc icon={aiBranch.merge.icon} index={0} merge />
                <p className="text-[11px] font-medium text-primary">
                  {aiBranch.merge.title}
                </p>
              </div>
            </div>
          )}

        {simpleBranches.map((branch, bi) =>
          "steps" in branch && branch.steps ? (
            <div
              key={branch.id}
              className="rounded-2xl border border-white/10 bg-card-bg/40 p-4"
            >
              <div className="mb-3 flex items-center gap-2.5">
                <NodeDisc icon={branch.icon} index={bi + 2} hub />
                <p className="text-sm font-medium text-white">{branch.title}</p>
              </div>
              <div className="flex gap-2 overflow-x-auto pb-1">
                {branch.steps.map((step, ti) => (
                  <div
                    key={step.title}
                    className="flex w-[4.5rem] shrink-0 flex-col items-center gap-1"
                  >
                    <NodeDisc icon={step.icon} index={bi + ti} />
                    <p className="text-center text-[9px] leading-tight text-white/90">
                      {step.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : null,
        )}

        <div className="flex flex-col items-center gap-2">
          <NodeDisc icon={end.icon} index={0} final />
          <p className="text-xs font-medium text-primary">{end.title}</p>
        </div>
      </div>

      {cta && (
        <motion.div
          className="mt-6 flex justify-center xl:mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{
            duration: 0.6,
            delay: ctaDelay,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <Button href={cta.href} variant="secondary">
            {cta.label}
          </Button>
        </motion.div>
      )}
    </div>
  );
}
