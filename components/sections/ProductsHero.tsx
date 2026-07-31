import { productsPage } from "@/lib/mock-data";
import { HeroProductsVisual } from "@/components/sections/HeroProductsVisual";
import { SplitHero } from "@/components/sections/SplitHero";

export function ProductsHero() {
  return (
    <SplitHero
      eyebrow={productsPage.eyebrow}
      from="Idea"
      to="Product"
      subtitle={productsPage.subtitle}
      visual={<HeroProductsVisual />}
    />
  );
}
