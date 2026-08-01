import type { Metadata } from "next";
import { ContactHero } from "@/components/sections/ContactHero";
import { ContactForm } from "@/components/sections/ContactForm";
import { contactPage } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "Contact",
  description: contactPage.subtitle,
};

export default function ContactPage() {
  return (
    <main className="flex flex-1 flex-col">
      <ContactHero />
      <ContactForm />
    </main>
  );
}
