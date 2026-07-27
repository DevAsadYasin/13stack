import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";

export function TextLink({
  href,
  external,
  children,
}: {
  href: string;
  external?: boolean;
  children: string;
}) {
  return (
    <Link
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="group inline-flex items-center gap-1.5 text-sm font-medium text-white transition-colors hover:text-primary"
    >
      {children}
      {external ? (
        <ExternalLink
          size={14}
          className="transition-transform group-hover:translate-x-0.5"
        />
      ) : (
        <ArrowRight
          size={14}
          className="transition-transform group-hover:translate-x-0.5"
        />
      )}
    </Link>
  );
}
