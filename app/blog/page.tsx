import type { Metadata } from "next";
import { BlogHero } from "@/components/sections/BlogHero";
import { BlogFeed } from "@/components/sections/BlogFeed";
import { CTA } from "@/components/sections/CTA";
import { blogPage } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "Build log",
  description: blogPage.subtitle,
};

export default function BlogPage() {
  return (
    <main className="flex flex-1 flex-col">
      <BlogHero />
      <BlogFeed />
      <CTA />
    </main>
  );
}
