import type { CSSProperties } from "react";
import type { TechStackLogo } from "@/lib/tech-stack-logos";

export function TechStackLogoIcon({
  name,
  path,
  hex,
  viewBox = "0 0 24 24",
}: TechStackLogo) {
  return (
    <span
      className="group inline-flex h-[22px] shrink-0 items-center opacity-70 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
      style={{ "--brand": `#${hex}` } as CSSProperties}
    >
      <svg
        role="img"
        aria-label={name}
        viewBox={viewBox}
        xmlns="http://www.w3.org/2000/svg"
        className="h-[22px] w-auto fill-[#bebebe] transition-colors duration-300 group-hover:fill-[var(--brand)]"
      >
        <path d={path} />
      </svg>
    </span>
  );
}
