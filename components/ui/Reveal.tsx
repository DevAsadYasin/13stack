"use client";

import { motion } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

export function RevealGroup({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={`mx-auto flex w-full max-w-[var(--page-max-width)] flex-col ${className ?? ""}`}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={staggerContainer}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <motion.div className={className} style={style} variants={fadeUp}>
      {children}
    </motion.div>
  );
}
