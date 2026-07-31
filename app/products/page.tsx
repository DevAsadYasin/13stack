import type { Metadata } from "next";
import { ProductsHero } from "@/components/sections/ProductsHero";
import { ProductsBody } from "@/components/sections/ProductsBody";
import { CTA } from "@/components/sections/CTA";
import { productsPage } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "Products",
  description: productsPage.subtitle,
};

export default function ProductsPage() {
  return (
    <main className="flex flex-1 flex-col">
      <ProductsHero />
      <ProductsBody />
      <CTA />
    </main>
  );
}
