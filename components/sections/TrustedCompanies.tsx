import { trustedCompanies } from "@/lib/mock-data";
import { techStackLogos } from "@/lib/tech-stack-logos";
import { TechStackLogoIcon } from "@/components/ui/TechStackLogo";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";

export function TrustedCompanies() {
  const logos = [...techStackLogos, ...techStackLogos];

  return (
    <section className="px-gutter py-16">
      <RevealGroup className="items-center gap-8">
        <RevealItem>
          <p className="text-xs tracking-wide text-text-03 uppercase">
            {trustedCompanies.title}
          </p>
        </RevealItem>
        <RevealItem className="w-full overflow-hidden">
          <div className="flex w-max animate-marquee items-center gap-16">
            {logos.map((logo, i) => (
              <TechStackLogoIcon key={`${logo.name}-${i}`} {...logo} />
            ))}
          </div>
        </RevealItem>
      </RevealGroup>
    </section>
  );
}
