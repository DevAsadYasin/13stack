import { servicesPage } from "@/lib/mock-data";
import { HeroServicesVisual } from "@/components/sections/HeroServicesVisual";
import { SplitHero } from "@/components/sections/SplitHero";

export function ServicesHero() {
  return (
    <SplitHero
      eyebrow={servicesPage.eyebrow}
      from="Idea"
      to="Infrastructure"
      subtitle={servicesPage.subtitle}
      visual={<HeroServicesVisual />}
      rule={false}
    />
  );
}
