import type { ReactNode } from "react";
import { RevealItem } from "@/components/ui/Reveal";

export function SectionHeading({
  title,
  subtitle,
  align = "center",
}: {
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "center" | "left";
}) {
  return (
    <div
      className={`flex max-w-[600px] flex-col gap-3 sm:gap-4 ${
        align === "center"
          ? "items-center text-center"
          : "items-start text-left"
      }`}
    >
      <RevealItem>
        <h2 className="text-[1.75rem] leading-tight font-medium tracking-tight sm:text-4xl">
          {title}
        </h2>
      </RevealItem>
      {subtitle && (
        <RevealItem>
          <p className="text-[0.9375rem] leading-relaxed text-text-03 sm:text-base">
            {subtitle}
          </p>
        </RevealItem>
      )}
    </div>
  );
}
