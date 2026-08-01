"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { aboutPage } from "@/lib/mock-data";
import { RevealItem } from "@/components/ui/Reveal";
import { staggerContainer, viewportOnce } from "@/lib/motion";

function SpineDot({ className = "" }: { className?: string }) {
  return (
    <span
      className={`absolute top-1/2 left-0 z-10 hidden size-2.5 -translate-x-[4.5px] -translate-y-1/2 rounded-full bg-primary shadow-[0_0_12px_rgba(0,145,255,0.6)] lg:block lg:-left-10 ${className}`}
      aria-hidden
    />
  );
}

function ScrollSection({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={`flex w-full flex-col ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={staggerContainer}
    >
      {children}
    </motion.div>
  );
}

function StaggerGrid({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={staggerContainer}>
      {children}
    </motion.div>
  );
}

function SectionHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <RevealItem className="relative mb-5 flex w-full flex-col gap-2 text-left sm:mb-6 sm:gap-2.5">
      {eyebrow && (
        <p className="text-xs font-medium tracking-wide text-primary uppercase">
          {eyebrow}
        </p>
      )}
      <div className="relative w-full">
        <SpineDot />
        <h2 className="w-full text-[clamp(1.55rem,3.5vw+0.7rem,2.35rem)] font-medium tracking-tight leading-[1.15] text-balance">
          {title}
        </h2>
      </div>
      {subtitle && (
        <p className="w-full max-w-3xl text-sm leading-snug text-pretty text-text-03 sm:text-base lg:text-lg">
          {subtitle}
        </p>
      )}
    </RevealItem>
  );
}

export function AboutBody() {
  const {
    overview,
    intro,
    whyUs,
    practices,
    impact,
    leadership,
    customerVoice,
    location,
  } = aboutPage;

  return (
    <section className="relative px-gutter pb-8 pt-2 sm:pb-10 sm:pt-3 md:pb-12">
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
          <ScrollSection className="gap-4 pb-8 sm:gap-5 sm:pb-10">
            <RevealItem>
              <header className="relative flex w-full flex-col gap-2 text-left sm:gap-2.5">
                <p className="text-xs font-medium tracking-wide text-primary uppercase">
                  {overview.eyebrow}
                </p>
                <div className="relative w-full">
                  <SpineDot />
                  <h2 className="w-full text-[clamp(1.65rem,4vw+0.75rem,2.75rem)] font-medium tracking-tight leading-[1.15] text-balance">
                    {overview.title}
                  </h2>
                </div>
                <p className="w-full max-w-3xl text-base leading-snug text-pretty text-text-03 sm:text-lg lg:text-xl">
                  {overview.subtitle}
                </p>
              </header>
            </RevealItem>
            <RevealItem>
              <p className="max-w-3xl text-base leading-relaxed text-pretty text-text-02 sm:text-lg">
                {intro}
              </p>
            </RevealItem>
          </ScrollSection>
          <article className="w-full border-t border-white/10 py-8 sm:py-10">
            <ScrollSection className="gap-5 sm:gap-6">
              <SectionHeader
                eyebrow={whyUs.eyebrow}
                title={whyUs.title}
                subtitle={whyUs.subtitle}
              />
              <StaggerGrid className="grid w-full grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2 sm:gap-y-6">
                {whyUs.points.map((point) => (
                  <RevealItem
                    key={point.title}
                    className="flex flex-col gap-1.5"
                  >
                    <div className="flex items-start gap-2.5">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                      <h3 className="text-base font-semibold tracking-tight text-white sm:text-lg">
                        {point.title}
                      </h3>
                    </div>
                    <p className="pl-4 text-sm leading-relaxed text-pretty text-text-03 sm:text-[15px]">
                      {point.body}
                    </p>
                  </RevealItem>
                ))}
              </StaggerGrid>
            </ScrollSection>
          </article>
          <article className="w-full border-t border-white/10 py-8 sm:py-10">
            <ScrollSection className="gap-5 sm:gap-6">
              <SectionHeader
                eyebrow={practices.eyebrow}
                title={practices.title}
                subtitle={practices.subtitle}
              />
              <StaggerGrid className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:gap-4">
                {practices.items.map((item, i) => (
                  <RevealItem
                    key={item.title}
                    className="group flex gap-3 rounded-xl border border-white/10 bg-card-bg/80 p-4 transition-colors hover:border-primary/30 sm:gap-4 sm:p-5"
                  >
                    <span className="font-mono text-xs tracking-wide text-primary sm:text-sm">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-semibold tracking-tight text-white sm:text-base">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-pretty text-text-03">
                        {item.body}
                      </p>
                    </div>
                  </RevealItem>
                ))}
              </StaggerGrid>
            </ScrollSection>
          </article>
          <article className="w-full border-t border-white/10 py-8 sm:py-10">
            <ScrollSection className="gap-5 sm:gap-6">
              <SectionHeader
                eyebrow={impact.eyebrow}
                title={impact.title}
                subtitle={impact.subtitle}
              />
              <StaggerGrid className="flex w-full flex-col gap-3 sm:gap-3.5">
                {impact.items.map((item) => (
                  <RevealItem
                    key={item.title}
                    className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3.5 sm:gap-3.5 sm:px-5 sm:py-4"
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                      <Check size={12} strokeWidth={2.5} />
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-sm font-semibold tracking-tight text-white sm:text-base">
                        {item.title}
                      </h3>
                      <p className="mt-0.5 text-sm leading-relaxed text-pretty text-text-03">
                        {item.body}
                      </p>
                    </div>
                  </RevealItem>
                ))}
              </StaggerGrid>
            </ScrollSection>
          </article>
          <article className="w-full border-t border-white/10 py-8 sm:py-10">
            <ScrollSection className="gap-5 sm:gap-6">
              <SectionHeader title={leadership.title} />
              <StaggerGrid className="grid w-full grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-3">
                {leadership.people.map((person) => (
                  <RevealItem
                    key={person.email}
                    className="flex h-full flex-col gap-3.5 rounded-2xl border border-white/10 bg-card-bg p-5 transition-colors hover:border-primary/30 sm:gap-4 sm:p-6"
                  >
                    <span
                      className="flex h-12 w-12 items-center justify-center rounded-full border border-primary/35 bg-primary/15 text-sm font-semibold tracking-wide text-primary"
                      aria-hidden
                    >
                      {person.initials}
                    </span>
                    <div className="flex flex-col gap-0.5">
                      <h3 className="text-base font-semibold tracking-tight text-white sm:text-lg">
                        {person.name}
                      </h3>
                      <p className="text-sm font-medium text-primary">
                        {person.title}
                      </p>
                      <a
                        href={`mailto:${person.email}`}
                        className="mt-0.5 w-fit text-xs text-text-03 transition-colors hover:text-white sm:text-sm"
                      >
                        {person.email}
                      </a>
                    </div>
                    <p className="text-sm leading-relaxed text-pretty text-text-03">
                      {person.bio}
                    </p>
                  </RevealItem>
                ))}
              </StaggerGrid>
            </ScrollSection>
          </article>
          <article className="w-full border-t border-white/10 py-8 sm:py-10">
            <ScrollSection className="gap-5 sm:gap-6">
              <SectionHeader
                eyebrow={customerVoice.eyebrow}
                title={customerVoice.title}
                subtitle={customerVoice.subtitle}
              />
              <StaggerGrid className="grid w-full grid-cols-1 gap-4 border-b border-white/10 pb-6 sm:grid-cols-3 sm:gap-5 sm:pb-8">
                {customerVoice.pillars.map((pillar) => (
                  <RevealItem
                    key={pillar.title}
                    className="flex flex-col gap-1.5"
                  >
                    <h3 className="text-sm font-semibold tracking-tight text-white sm:text-base">
                      {pillar.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-pretty text-text-03">
                      {pillar.body}
                    </p>
                  </RevealItem>
                ))}
              </StaggerGrid>
              <RevealItem>
                <h3 className="text-base font-semibold tracking-tight text-white sm:text-lg">
                  {customerVoice.reviewsTitle}
                </h3>
              </RevealItem>
              <StaggerGrid className="grid w-full grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
                {customerVoice.reviews.map((review) => (
                  <RevealItem
                    key={review.quote.slice(0, 24)}
                    className="flex h-full flex-col gap-3 rounded-xl border border-white/10 bg-card-bg p-4 sm:p-5"
                  >
                    <p className="flex-1 text-sm leading-relaxed text-pretty text-text-02">
                      “{review.quote}”
                    </p>
                    <div className="border-t border-white/10 pt-2.5">
                      <p className="text-sm font-medium text-white">
                        {review.author}
                      </p>
                      <p className="text-xs text-primary">{review.context}</p>
                    </div>
                  </RevealItem>
                ))}
              </StaggerGrid>
            </ScrollSection>
          </article>
          <article className="w-full border-t border-white/10 pt-8 sm:pt-10">
            <ScrollSection className="gap-3 sm:gap-4">
              <RevealItem>
                <div className="relative w-full">
                  <SpineDot />
                  <h2 className="text-[clamp(1.55rem,3.5vw+0.7rem,2.35rem)] font-medium tracking-tight leading-[1.15] text-balance">
                    {location.title}
                  </h2>
                </div>
              </RevealItem>
              <RevealItem>
                <p className="max-w-3xl text-sm leading-relaxed text-pretty text-text-03 sm:text-base lg:text-lg">
                  {location.body}
                </p>
              </RevealItem>
            </ScrollSection>
          </article>
        </div>
      </div>
    </section>
  );
}
