import { aboutPage } from "@/lib/mock-data";
import { HeroAboutVisual } from "@/components/sections/HeroAboutVisual";
import { SplitHero } from "@/components/sections/SplitHero";

export function AboutHero() {
  return (
    <SplitHero
      eyebrow={aboutPage.eyebrow}
      from={aboutPage.headingFrom}
      to={aboutPage.headingTo}
      subtitle={aboutPage.subtitle}
      visual={<HeroAboutVisual />}
    />
  );
}
