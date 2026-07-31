"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { servicesPage } from "@/lib/mock-data";
import { ServiceDeepDiveList } from "@/components/sections/ServiceDeepDives";
import { ServicesProcess } from "@/components/sections/ServicesProcess";

type TabId = "what" | "how";

export function ServicesTabs() {
  const [tab, setTab] = useState<TabId>("what");
  const { tabs } = servicesPage;

  return (
    <section className="relative px-gutter pb-6 pt-1 sm:pb-8 sm:pt-2 md:pb-10">
      <div className="relative mx-auto w-full max-w-[var(--page-max-width)] lg:pl-6">
        <div className="sticky top-16 z-30 mb-5 border-b border-white/10 bg-bg-primary/90 backdrop-blur-md sm:mb-6">
          <div
            role="tablist"
            aria-label="Services"
            className="flex w-full gap-0 sm:w-auto sm:gap-1"
          >
            {(
              [
                { id: "what" as const, label: tabs.what },
                { id: "how" as const, label: tabs.how },
              ] as const
            ).map((item) => {
              const active = tab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  id={`services-tab-${item.id}`}
                  aria-controls={`services-panel-${item.id}`}
                  onClick={() => setTab(item.id)}
                  className={`relative min-h-11 flex-1 px-3 py-3 text-sm font-medium tracking-tight transition-colors sm:flex-none sm:px-5 sm:text-base ${
                    active ? "text-white" : "text-text-03 hover:text-text-02"
                  }`}
                >
                  {item.label}
                  {active && (
                    <motion.span
                      layoutId="services-tab-underline"
                      className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-primary shadow-[0_0_12px_rgba(0,145,255,0.7)] sm:inset-x-3"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 32,
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="relative min-h-[10rem] min-w-0">
          <AnimatePresence mode="wait">
            {tab === "what" ? (
              <motion.div
                key="what"
                id="services-panel-what"
                role="tabpanel"
                aria-labelledby="services-tab-what"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <ServiceDeepDiveList active />
              </motion.div>
            ) : (
              <motion.div
                key="how"
                id="services-panel-how"
                role="tabpanel"
                aria-labelledby="services-tab-how"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <ServicesProcess />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
