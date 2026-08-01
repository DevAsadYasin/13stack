"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { navigation } from "@/lib/mock-data";
import { Button } from "@/components/ui/Button";

function NavLinks({
  variant,
  onLinkClick,
}: {
  variant: "desktop" | "mobile";
  onLinkClick?: () => void;
}) {
  const pathname = usePathname();

  return (
    <>
      {navigation.links.map((link) => {
        const isActive =
          link.href === "/"
            ? pathname === "/"
            : pathname === link.href || pathname.startsWith(`${link.href}/`);
        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={onLinkClick}
            className={`relative text-sm transition-colors ${
              isActive ? "text-white" : "text-text-03 hover:text-white"
            }`}
          >
            {link.label}
            {isActive && (
              <motion.span
                layoutId={`nav-active-${variant}`}
                className="absolute right-0 -bottom-1.5 left-0 h-[2px] rounded-full bg-primary"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
          </Link>
        );
      })}
    </>
  );
}

export function Navigation() {
  const [open, setOpen] = useState(false);

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-50 border-b border-white/10 bg-bg-primary/80 backdrop-blur"
    >
      <div className="flex h-16 w-full items-center justify-between px-nav-gutter">
        <Link href="/" className="flex items-center">
          <Image
            src="/assets/svg/13stack-lockup-white-on-dark.svg"
            alt="13Stack"
            width={210}
            height={50}
            className="h-9 w-auto"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-10 md:flex">
          <NavLinks variant="desktop" />
        </nav>

        <div className="hidden md:block">
          <Button href="/contact">{navigation.cta}</Button>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          className="flex h-8 w-8 flex-col items-center justify-center gap-1.5 md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          <motion.span
            className="h-[2px] w-5 rounded-full bg-text-03"
            animate={{ rotate: open ? 45 : 0, y: open ? 4 : 0 }}
          />
          <motion.span
            className="h-[2px] w-5 rounded-full bg-text-03"
            animate={{ rotate: open ? -45 : 0, y: open ? -4 : 0 }}
          />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-t border-white/10 md:hidden"
          >
            <div className="flex flex-col gap-4 px-nav-gutter py-4">
              <NavLinks variant="mobile" onLinkClick={() => setOpen(false)} />
              <Button href="/contact">{navigation.cta}</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
