import type { Metadata } from "next";
import { AboutHero } from "@/components/sections/AboutHero";
import { AboutBody } from "@/components/sections/AboutBody";
import { CTA } from "@/components/sections/CTA";
import { aboutPage } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "About",
  description: aboutPage.subtitle,
};

export default function AboutPage() {
  return (
    <main className="flex flex-1 flex-col">
      <AboutHero />
      <AboutBody />
      <CTA />
    </main>
  );
}
