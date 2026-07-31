import { workPage } from "@/lib/mock-data";
import { HeroWorkVisual } from "@/components/sections/HeroWorkVisual";
import { SplitHero } from "@/components/sections/SplitHero";

export function WorkHero() {
  return (
    <SplitHero
      eyebrow={workPage.eyebrow}
      from="Brief"
      to="Shipped"
      subtitle={workPage.subtitle}
      visual={<HeroWorkVisual />}
    />
  );
}
