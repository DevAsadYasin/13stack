import type { Metadata } from "next";
import { ServicesHero } from "@/components/sections/ServicesHero";
import { ServicesTabs } from "@/components/sections/ServicesTabs";
import { CTA } from "@/components/sections/CTA";
import { servicesPage } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "Services",
  description: servicesPage.subtitle,
};

export default function ServicesPage() {
  return (
    <main className="flex flex-1 flex-col">
      <ServicesHero />
      <ServicesTabs />
      <CTA />
    </main>
  );
}
