export function HeroRule({ className = "" }: { className?: string }) {
  return (
    <div
      className={`mx-auto w-full max-w-[var(--page-max-width)] border-t border-white/10 ${className}`}
      aria-hidden
    />
  );
}
