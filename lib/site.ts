export const siteConfig = {
  name: "13Stack",
  description:
    "13Stack designs, builds, and ships production AI systems, full-stack products, and agentic automation.",
  defaultTitle: "13Stack | AI Systems and Products",
  contactEmail: "hello@13stack.com",
};

export function getSiteUrl() {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromEnv) return fromEnv.replace(/\/$/, "");
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL.replace(/\/$/, "")}`;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL.replace(/\/$/, "")}`;
  }
  return "http://localhost:3000";
}
