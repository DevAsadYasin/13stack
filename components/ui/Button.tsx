"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "light";

const variantClasses: Record<Variant, string> = {
  primary: "bg-primary text-white",
  secondary: "bg-transparent text-white border border-border-01/20",
  light: "bg-white text-bg-primary",
};

export function Button({
  href,
  variant = "primary",
  className = "",
  children,
}: {
  href: string;
  variant?: Variant;
  className?: string;
  children: ReactNode;
}) {
  const fullWidth = /\bw-full\b/.test(className);

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={fullWidth ? "block w-full" : "inline-block"}
    >
      <Link
        href={href}
        className={`inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium tracking-tight transition-colors hover:brightness-110 ${variantClasses[variant]} ${className}`}
      >
        {children}
      </Link>
    </motion.div>
  );
}
