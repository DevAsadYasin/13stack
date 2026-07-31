"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CalendarSync,
  Gauge,
  UserRoundPlus,
  Sparkles,
  ArrowRight,
  Link2,
  Check,
  AlertTriangle,
  type LucideIcon,
} from "lucide-react";
import { productFeature } from "@/lib/mock-data";
import { Button } from "@/components/ui/Button";
import { viewportOnce } from "@/lib/motion";

const rowIcons: LucideIcon[] = [CalendarSync, Gauge, UserRoundPlus, Sparkles];

type Preview = (typeof productFeature.rows)[number]["preview"];

function FeaturePreview({ preview }: { preview: Preview }) {
  if (preview.kind === "sync") {
    return (
      <div className="relative flex flex-1 flex-col gap-5 p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[11px] tracking-wide text-primary uppercase">
              Live pipeline
            </p>
            <p className="mt-1 text-lg font-semibold tracking-tight text-white">
              Calendar sync graph
            </p>
          </div>
          <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-1 text-[11px] font-medium text-emerald-300">
            Healthy
          </span>
        </div>

        <div className="flex items-center justify-between gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-3">
          {preview.pipeline.map((step, i) => (
            <div key={step} className="flex min-w-0 flex-1 items-center gap-2">
              <div
                className={`min-w-0 flex-1 rounded-lg px-2 py-2 text-center text-[11px] font-medium ${
                  i === 1
                    ? "bg-primary text-white shadow-[0_0_18px_rgba(0,145,255,0.35)]"
                    : "border border-white/10 bg-[#0d0d0d] text-text-03"
                }`}
              >
                {step}
              </div>
              {i < preview.pipeline.length - 1 && (
                <ArrowRight size={12} className="shrink-0 text-primary/70" />
              )}
            </div>
          ))}
        </div>

        <div className="flex flex-1 flex-col gap-2.5">
          {preview.accounts.map((account) => (
            <div
              key={account.name}
              className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-[#0d0d0d] px-3.5 py-3"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-white">
                  {account.name}
                </p>
                <p className="truncate text-xs text-text-03">
                  {account.status}
                </p>
              </div>
              <span
                className={`size-2.5 shrink-0 rounded-full ${
                  account.connected
                    ? "bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.7)]"
                    : "bg-white/25"
                }`}
              />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-primary/30 bg-primary/10 p-3.5">
            <p className="text-[11px] tracking-wide text-primary uppercase">
              Round-trip
            </p>
            <p className="mt-1 text-2xl font-semibold tracking-tight text-white">
              {preview.latency}
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3.5">
            <p className="text-[11px] tracking-wide text-text-03 uppercase">
              Delta sync
            </p>
            <p className="mt-1 text-sm leading-snug font-medium text-white">
              {preview.eventsUpdated}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (preview.kind === "availability") {
    return (
      <div className="relative flex flex-1 flex-col gap-5 p-5 sm:p-6">
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-[11px] tracking-wide text-primary uppercase">
              Computed day
            </p>
            <p className="mt-1 text-lg font-semibold tracking-tight text-white">
              {preview.dayLabel}
            </p>
          </div>
          <p className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white shadow-[0_0_18px_rgba(0,145,255,0.4)]">
            {preview.openHours}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {preview.rules.map((rule) => (
            <span
              key={rule}
              className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] text-text-03"
            >
              {rule}
            </span>
          ))}
        </div>

        <div className="relative flex flex-1 flex-col gap-2 border-l border-primary/30 pl-4">
          {preview.blocks.map((block) => (
            <div
              key={`${block.label}-${block.range}`}
              className={`relative rounded-xl border px-3.5 py-3 ${
                block.tone === "open"
                  ? "border-primary/40 bg-primary/15"
                  : block.tone === "locked"
                    ? "border-white/10 bg-white/[0.04]"
                    : "border-white/10 bg-[#0d0d0d]"
              }`}
            >
              <span className="absolute top-1/2 -left-[21px] size-2.5 -translate-y-1/2 rounded-full border-2 border-card-bg bg-primary" />
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-white">
                    {block.label}
                  </p>
                  <p className="text-xs text-text-03">{block.range}</p>
                </div>
                <span
                  className={`text-[10px] font-semibold tracking-wide uppercase ${
                    block.tone === "open"
                      ? "text-primary"
                      : block.tone === "locked"
                        ? "text-text-03"
                        : "text-white/50"
                  }`}
                >
                  {block.tone}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (preview.kind === "booking") {
    return (
      <div className="relative flex flex-1 flex-col gap-4 p-5 sm:p-6">
        <div className="rounded-xl border border-dashed border-primary/40 bg-primary/10 px-3.5 py-3">
          <p className="text-[11px] tracking-wide text-primary uppercase">
            Shareable link
          </p>
          <div className="mt-2 flex items-center gap-2">
            <Link2 size={14} className="shrink-0 text-primary" />
            <p className="truncate text-sm font-medium text-white">
              {preview.link}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-white/10 bg-[#0d0d0d] p-3.5">
            <p className="text-[11px] text-text-03">Guest sees</p>
            <p className="mt-2 text-sm font-semibold text-white">
              {preview.guestSlot}
            </p>
            <p className="mt-1 text-xs text-text-03">{preview.guest}</p>
          </div>
          <div className="rounded-xl border border-primary/35 bg-primary/10 p-3.5">
            <p className="text-[11px] text-primary">You confirm</p>
            <p className="mt-2 text-sm font-semibold text-white">
              {preview.slot}
            </p>
            <p className="mt-1 text-xs text-text-03">{preview.hostZone}</p>
          </div>
        </div>

        <div className="relative flex flex-1 flex-col justify-end">
          <div className="rounded-2xl bg-primary p-5 text-white shadow-[0_0_36px_rgba(0,145,255,0.4)]">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[11px] tracking-wide text-white/75 uppercase">
                  Booking confirmed
                </p>
                <p className="mt-2 text-xl font-semibold tracking-tight">
                  {preview.slot}
                </p>
                <p className="mt-1 text-sm text-white/85">{preview.guest}</p>
              </div>
              <span className="flex size-9 items-center justify-center rounded-full bg-white/20">
                <Check size={18} />
              </span>
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-white/20 pt-3 text-xs text-white/85">
              <span>Calendar invite</span>
              <span className="font-medium">{preview.status}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex flex-1 flex-col gap-4 p-5 sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-white shadow-[0_0_18px_rgba(0,145,255,0.4)]">
            <Sparkles size={16} />
          </span>
          <div>
            <p className="text-sm font-semibold text-white">AI Daily Brief</p>
            <p className="text-xs text-text-03">{preview.generatedAt}</p>
          </div>
        </div>
        <span className="rounded-full border border-amber-300/30 bg-amber-300/10 px-2.5 py-1 text-[11px] font-medium text-amber-200">
          {preview.scoreLabel}: {preview.scoreValue}
        </span>
      </div>

      <div className="rounded-xl border border-white/10 bg-[#0d0d0d] p-4">
        <p className="text-base font-medium tracking-tight text-white">
          {preview.greeting}
        </p>
        <div className="mt-3 flex gap-2.5 rounded-lg border border-amber-300/20 bg-amber-300/10 px-3 py-2.5">
          <AlertTriangle size={14} className="mt-0.5 shrink-0 text-amber-200" />
          <p className="text-xs leading-relaxed text-amber-100/90">
            {preview.warning}
          </p>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2">
        {preview.bullets.map((bullet, i) => (
          <div
            key={bullet}
            className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-3"
          >
            <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/20 text-[10px] font-semibold text-primary">
              {i + 1}
            </span>
            <p className="text-sm leading-snug text-white/90">{bullet}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ProductFeature() {
  const [active, setActive] = useState(productFeature.defaultExpanded);
  const { rows } = productFeature;
  const activeRow = rows[active] ?? rows[0];

  return (
    <article
      id="skedvio"
      className="relative scroll-mt-28 overflow-x-clip py-6 sm:scroll-mt-32 sm:py-8 lg:overflow-visible lg:py-10"
    >
      <div
        className="pointer-events-none absolute top-1/2 right-0 h-[200px] w-[200px] translate-x-1/4 -translate-y-1/2 rounded-full bg-primary/12 blur-[80px] sm:h-[280px] sm:w-[280px]"
        aria-hidden
      />

      <div className="relative z-10 flex flex-col gap-5 sm:gap-7 lg:gap-8">
        <div className="flex w-full flex-col gap-2 text-left sm:gap-3">
          <span className="w-fit rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-[11px] font-medium tracking-wide text-primary">
            {productFeature.badge}
          </span>
          <div className="relative w-full">
            <span
              className="absolute top-1/2 left-0 z-10 hidden size-2.5 -translate-x-[4.5px] -translate-y-1/2 rounded-full bg-primary shadow-[0_0_12px_rgba(0,145,255,0.6)] lg:block lg:-left-10"
              aria-hidden
            />
            <h2 className="w-full text-[clamp(1.55rem,4vw+0.7rem,2.75rem)] font-medium tracking-tight leading-[1.15] text-balance">
              {productFeature.title}
            </h2>
          </div>
          <p className="w-full text-base leading-snug text-text-03 text-pretty sm:text-lg lg:text-xl">
            {productFeature.subtitle}
          </p>
        </div>

        <div className="grid w-full grid-cols-1 items-stretch gap-5 sm:gap-6 md:grid-cols-2 lg:gap-8">
          <motion.div
            className="relative flex min-h-[360px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-card-bg sm:min-h-[420px]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,145,255,0.16),transparent_58%)]"
              aria-hidden
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={activeRow.featureTitle}
                className="relative flex flex-1 flex-col"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              >
                <FeaturePreview preview={activeRow.preview} />
              </motion.div>
            </AnimatePresence>
          </motion.div>

          <motion.div
            className="flex flex-col divide-y divide-white/10 rounded-2xl border border-white/10 bg-card-bg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{
              duration: 0.55,
              delay: 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            role="tablist"
            aria-label="Skedvio features"
          >
            {rows.map((row, i) => {
              const Icon = rowIcons[i];
              const isActive = i === active;
              return (
                <button
                  key={row.featureTitle}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActive(i)}
                  className={`flex flex-1 items-start gap-3 p-4 text-left transition-colors sm:gap-4 sm:p-5 md:p-6 ${
                    isActive ? "bg-white/5" : "hover:bg-white/[0.03]"
                  }`}
                >
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border ${
                      isActive
                        ? "border-primary text-primary"
                        : "border-white/15 text-text-03"
                    }`}
                  >
                    <Icon size={16} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3
                      className={`text-base font-semibold tracking-tight ${
                        isActive ? "text-white" : "text-white/85"
                      }`}
                    >
                      {row.featureTitle}
                    </h3>
                    <p
                      className={`mt-1.5 text-sm leading-relaxed transition-colors ${
                        isActive
                          ? "text-text-03"
                          : "line-clamp-2 text-text-03/70"
                      }`}
                    >
                      {row.featureDescription}
                    </p>
                  </div>
                  <ArrowRight
                    size={16}
                    className={`mt-1 shrink-0 transition-colors ${
                      isActive ? "text-primary" : "text-text-03/60"
                    }`}
                  />
                </button>
              );
            })}
          </motion.div>
        </div>

        <div>
          <Button
            href={productFeature.ctaHref}
            variant="primary"
            className="w-full px-7 py-3.5 text-base sm:w-auto"
          >
            {productFeature.cta}
          </Button>
        </div>
      </div>
    </article>
  );
}
