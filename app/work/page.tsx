import type { Metadata } from "next";
import { WorkHero } from "@/components/sections/WorkHero";
import { WorkCaseStudies } from "@/components/sections/WorkCaseStudies";
import { CTA } from "@/components/sections/CTA";
import { workPage } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "Work",
  description: workPage.subtitle,
};

export default function WorkPage() {
  return (
    <main className="flex flex-1 flex-col">
      <WorkHero />
      <WorkCaseStudies />
      <CTA />
    </main>
  );
}
