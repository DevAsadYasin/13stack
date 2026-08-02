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

type ProgressAxis = {
  start: number;
  branch: number;
  sub: number;
  steps: readonly number[];
  join: number;
  prod: number;
};

type LaneAxis = {
  ml: number;
  genai: number;
  stack: number;
  auto: number;
};

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

const mobileTitleAliases: Record<string, string> = {
  "Discovery & Planning": "Discovery",
  "AI & ML Engineering": "AI & ML",
  "Full-Stack Development": "Full-stack",
  "Automation & Agentic Systems": "Automation",
  "Model & Tool Orchestration": "Orchestration",
  "Training & Tuning": "Training",
  "Data Processing": "Data",
  "Model Selection": "Models",
  "Model Serving": "Serving",
  "Prompt Design": "Prompts",
  "Evals & Safety": "Evals",
  "AI Systems Ready": "AI Ready",
  "Process Mapping": "Mapping",
  "Test & Launch": "Launch",
  "Production-ready": "Production",
  "Data Layer": "Data",
};

function displayTitle(title: string, dense: boolean) {
  if (!dense) return title;
  return mobileTitleAliases[title] ?? title;
}

function FlowPath({
  d,
  delay = 0,
  gradientId,
  drawn,
  strokeWidth = 2.25,
}: {
  d: string;
  delay?: number;
  gradientId: string;
  drawn: boolean;
  strokeWidth?: number;
}) {
  return (
    <g>
      <path
        d={d}
        fill="none"
        stroke="rgba(0,145,255,0.14)"
        strokeWidth={strokeWidth + 0.25}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <motion.path
        d={d}
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth={strokeWidth}
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
    const handle = Math.min(Math.max(28, dist * 0.38), dist * 0.5);

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
  dense = false,
}: {
  icon: string;
  index: number;
  final?: boolean;
  hub?: boolean;
  merge?: boolean;
  dense?: boolean;
}) {
  const Icon = icon !== "logo" ? iconMap[icon] : undefined;
  const shell = dense
    ? final
      ? "size-[4.75rem]"
      : merge
        ? "size-[4.25rem]"
        : hub
          ? "size-[4rem]"
          : "size-[3.4rem]"
    : final
      ? "size-[5.5rem]"
      : merge
        ? "size-[4.75rem]"
        : hub
          ? "size-[4.25rem]"
          : "size-[3.5rem]";
  const disc = dense
    ? final
      ? "size-[3.6rem]"
      : merge
        ? "size-[3.2rem]"
        : hub
          ? "size-[3rem]"
          : "size-[2.55rem]"
    : final
      ? "size-[4.25rem]"
      : merge
        ? "size-[3.5rem]"
        : hub
          ? "size-[3.15rem]"
          : "size-[2.6rem]";
  const iconPx = dense
    ? final
      ? 26
      : merge
        ? 20
        : hub
          ? 17
          : 15
    : final
      ? 28
      : merge
        ? 22
        : hub
          ? 18
          : 15;
  const fill = final || merge ? "#0091ff" : discFills[index % discFills.length];

  return (
    <div className={`relative flex shrink-0 items-center justify-center ${shell}`}>
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

function buildFlowGraph({
  orientation,
  progress,
  lanes,
  radiusScale = 1,
}: {
  orientation: "horizontal" | "vertical";
  progress: ProgressAxis;
  lanes: LaneAxis;
  radiusScale?: number;
}) {
  const { start, branches, end } = howWeBuild;
  const aiBranch = branches.find((b) => "subPaths" in b && b.subPaths);
  const simpleBranches = branches.filter(
    (b) => !("subPaths" in b && b.subPaths),
  );

  const pt = (progressValue: number, laneValue: number): Pt =>
    orientation === "horizontal"
      ? { x: progressValue, y: laneValue }
      : { x: laneValue, y: progressValue };

  const aiHubLane = (lanes.ml + lanes.genai) / 2;
  const startLane = (aiHubLane + lanes.stack + lanes.auto) / 3;
  const startPt = pt(progress.start, startLane);
  const endPt = pt(progress.prod, startLane);
  const R = {
    start: radiusFor("start") * radiusScale,
    hub: radiusFor("hub") * radiusScale,
    step: radiusFor("step") * radiusScale,
    merge: radiusFor("merge") * radiusScale,
    end: radiusFor("end") * radiusScale,
  };

  const nodes: PlacedNode[] = [
    {
      key: "start",
      ...startPt,
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
    const hubPt = pt(progress.branch, aiHubLane);
    nodes.push({
      key: "hub-ai-ml",
      ...hubPt,
      title: aiBranch.title,
      icon: aiBranch.icon,
      index: 1,
      hub: true,
      delay: 0.1,
    });
    paths.push({
      d: smoothPath([startPt, hubPt], [R.start, R.hub]),
      delay: 0.08,
    });

    const mergePt = pt(progress.join, aiHubLane);
    nodes.push({
      key: "merge-ai",
      ...mergePt,
      title: aiBranch.merge.title,
      icon: aiBranch.merge.icon,
      index: 2,
      merge: true,
      delay: 0.78,
    });

    aiBranch.subPaths.forEach((sub, si) => {
      const lane = si === 0 ? lanes.ml : lanes.genai;
      const subPt = pt(progress.sub, lane);
      nodes.push({
        key: `sub-${sub.id}`,
        ...subPt,
        title: sub.title,
        icon: sub.icon,
        index: 3 + si,
        hub: true,
        delay: 0.18 + si * 0.06,
      });
      paths.push({
        d: smoothPath([hubPt, subPt], [R.hub, R.hub]),
        delay: 0.16 + si * 0.06,
      });

      const lanePts: Pt[] = [
        subPt,
        ...progress.steps.map((step) => pt(step, lane)),
        mergePt,
      ];
      const laneR = [R.hub, ...progress.steps.map(() => R.step), R.merge];
      paths.push({
        d: smoothPath(lanePts, laneR),
        delay: 0.28 + si * 0.08,
      });

      sub.steps.forEach((step, ti) => {
        const stepPt = pt(
          progress.steps[ti] ?? progress.steps[progress.steps.length - 1],
          lane,
        );
        nodes.push({
          key: `${sub.id}-${ti}`,
          ...stepPt,
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

  const simpleLanes = [lanes.stack, lanes.auto];
  simpleBranches.forEach((branch, bi) => {
    if (!("steps" in branch) || !branch.steps) return;
    const lane = simpleLanes[bi] ?? lanes.stack;
    const hubPt = pt(progress.branch, lane);
    nodes.push({
      key: `hub-${branch.id}`,
      ...hubPt,
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

    const stepPts = progress.steps.map((step) => pt(step, lane));
    const joinPt = pt(progress.join, lane);
    paths.push({
      d: smoothPath(
        [hubPt, ...stepPts, joinPt],
        [R.hub, ...progress.steps.map(() => R.step), 0],
      ),
      delay: 0.26 + bi * 0.08,
    });
    paths.push({
      d: smoothPath([joinPt, endPt], [0, R.end]),
      delay: 0.85 + bi * 0.05,
    });

    branch.steps.forEach((step, ti) => {
      const stepPt = pt(
        progress.steps[ti] ?? progress.steps[progress.steps.length - 1],
        lane,
      );
      nodes.push({
        key: `${branch.id}-${ti}`,
        ...stepPt,
        title: step.title,
        icon: step.icon,
        index: 12 + bi * 6 + ti,
        delay: 0.32 + bi * 0.06 + ti * 0.05,
      });
    });
  });

  nodes.push({
    key: "end",
    ...endPt,
    title: end.title,
    icon: end.icon,
    index: 0,
    final: true,
    delay: 0.98,
  });

  return { nodes, paths };
}

function FlowCanvas({
  width,
  height,
  nodes,
  paths,
  inView,
  gradientId,
  dense = false,
  gradientAxis = "horizontal",
}: {
  width: number;
  height: number;
  nodes: PlacedNode[];
  paths: { d: string; delay: number }[];
  inView: boolean;
  gradientId: string;
  dense?: boolean;
  gradientAxis?: "horizontal" | "vertical";
}) {
  return (
    <div className="relative w-full" style={{ aspectRatio: `${width} / ${height}` }}>
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden
      >
        <defs>
          <linearGradient
            id={gradientId}
            x1="0%"
            y1="0%"
            x2={gradientAxis === "horizontal" ? "100%" : "0%"}
            y2={gradientAxis === "horizontal" ? "0%" : "100%"}
          >
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
            gradientId={gradientId}
            drawn={inView}
            strokeWidth={dense ? 2 : 2.25}
          />
        ))}
      </svg>

      {nodes.map((node) => {
        const sideLabel =
          dense && !node.hub && !node.merge && !node.final;
        const labelLeft = sideLabel && node.x >= width / 2;

        return (
          <div
            key={node.key}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${(node.x / width) * 100}%`,
              top: `${(node.y / height) * 100}%`,
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
                dense={dense}
              />
              <p
                className={`absolute font-medium tracking-tight leading-tight ${
                  node.final || node.merge ? "text-primary" : "text-white/90"
                } ${
                  dense
                    ? sideLabel
                      ? `top-1/2 w-[3.9rem] -translate-y-1/2 text-[10px] ${
                          labelLeft
                            ? "right-full mr-1 text-right"
                            : "left-full ml-1 text-left"
                        }`
                      : "top-full left-1/2 w-[5.5rem] -translate-x-1/2 pt-1 text-center text-[10px]"
                    : "top-full left-1/2 w-[6.5rem] -translate-x-1/2 pt-2 text-center text-[10px]"
                }`}
              >
                {displayTitle(node.title, dense)}
              </p>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}

export function MultiPathBuildFlow({
  cta,
}: {
  cta?: { label: string; href: string };
} = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [ctaDelay, setCtaDelay] = useState(CONVERGENCE_COMPLETE_DELAY);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1280px)");
    const sync = () =>
      setCtaDelay(mq.matches ? CONVERGENCE_COMPLETE_DELAY : 0.45);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const desktop = buildFlowGraph({
    orientation: "horizontal",
    progress: {
      start: 70,
      branch: 195,
      sub: 310,
      steps: [430, 545, 660, 775, 890],
      join: 1025,
      prod: 1200,
    },
    lanes: {
      ml: 95,
      genai: 230,
      stack: 385,
      auto: 530,
    },
  });

  const mobile = buildFlowGraph({
    orientation: "vertical",
    radiusScale: 0.64,
    progress: {
      start: 34,
      branch: 96,
      sub: 148,
      steps: [196, 236, 276, 316, 356],
      join: 412,
      prod: 472,
    },
    lanes: {
      ml: 54,
      genai: 136,
      stack: 244,
      auto: 326,
    },
  });

  return (
    <div ref={ref} className="w-full">
      <div className="relative hidden w-full xl:block">
        <FlowCanvas
          width={1280}
          height={620}
          nodes={desktop.nodes}
          paths={desktop.paths}
          inView={inView}
          gradientId="flow-multipath"
          gradientAxis="horizontal"
        />
      </div>

      <div className="relative -mx-1 w-[calc(100%+0.5rem)] xl:hidden">
        <FlowCanvas
          width={380}
          height={540}
          nodes={mobile.nodes}
          paths={mobile.paths}
          inView={inView}
          gradientId="flow-multipath-mobile"
          gradientAxis="vertical"
          dense
        />
      </div>

      {cta && (
        <motion.div
          className="mt-4 flex justify-center sm:mt-6 xl:mt-10"
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
