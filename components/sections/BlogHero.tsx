import { blogPage } from "@/lib/mock-data";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { HeroRule } from "@/components/ui/HeroRule";

export function BlogHero() {
  return (
    <section className="px-gutter pt-28 pb-0 sm:pt-36">
      <RevealGroup className="max-w-3xl items-start gap-3 pb-10 text-left sm:gap-4 sm:pb-12">
        <RevealItem>
          <p className="text-xs font-medium tracking-wide text-primary uppercase">
            {blogPage.eyebrow}
          </p>
        </RevealItem>
        <RevealItem>
          <h1 className="text-[clamp(2rem,4vw+0.8rem,3rem)] font-medium tracking-tight leading-[1.12] text-balance">
            {blogPage.title}
          </h1>
        </RevealItem>
        <RevealItem>
          <p className="max-w-2xl text-base leading-relaxed text-pretty text-text-03 sm:text-lg">
            {blogPage.subtitle}
          </p>
        </RevealItem>
      </RevealGroup>
      <HeroRule />
    </section>
  );
}
