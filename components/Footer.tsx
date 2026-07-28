import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { footer, newsletter } from "@/lib/mock-data";
import { NewsletterForm } from "@/components/NewsletterForm";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";

function FooterLink({
  label,
  href,
  external,
}: {
  label: string;
  href: string;
  external?: boolean;
}) {
  const className =
    "inline-flex items-center gap-1 text-sm text-text-03 transition-colors hover:text-white";

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {label}
        <ArrowUpRight size={12} className="opacity-70" />
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {label}
    </Link>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-white/10 px-gutter py-16">
      <RevealGroup className="gap-12">
        <div className="flex flex-col justify-between gap-10 lg:flex-row lg:gap-16">
          <RevealItem className="max-w-sm">
            <Link href="/" className="inline-flex">
              <Image
                src="/assets/svg/13stack-lockup-white-on-dark.svg"
                alt="13Stack"
                width={210}
                height={50}
                className="h-9 w-auto"
              />
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-text-03">
              {footer.tagline}
            </p>
            <p className="mt-2 text-sm text-text-03">{footer.location}</p>
          </RevealItem>

          <RevealItem className="grid flex-1 grid-cols-2 gap-10 sm:gap-16 lg:max-w-md">
            {footer.columns.map((column) => (
              <div key={column.title}>
                <h3 className="text-sm font-medium text-white">
                  {column.title}
                </h3>
                <ul className="mt-4 flex flex-col gap-3">
                  {column.links.map((link) => (
                    <li key={`${column.title}-${link.label}`}>
                      <FooterLink
                        label={link.label}
                        href={link.href}
                        external={"external" in link ? link.external : false}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </RevealItem>
        </div>

        <RevealItem className="flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-start sm:justify-between sm:gap-10">
          <div className="max-w-sm">
            <h3 className="text-sm font-medium text-white">
              {newsletter.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-text-03">
              {newsletter.description}
            </p>
          </div>
          <NewsletterForm />
        </RevealItem>

        <RevealItem>
          <div className="flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-text-03">{footer.copyright}</p>
            <Link
              href="/contact"
              className="text-xs font-medium text-text-03 transition-colors hover:text-white"
            >
              Book a consultation
            </Link>
          </div>
        </RevealItem>
      </RevealGroup>
    </footer>
  );
}
