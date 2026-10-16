import type { Metadata } from "next";
import { HomePage } from "@/components/home-page";
import { site } from "@/content";

export const metadata: Metadata = {
  title: { absolute: site.seoTitle.es },
  description: site.seoDescription.es,
  alternates: { canonical: "/es", languages: { en: "/", es: "/es", "x-default": "/" } },
  openGraph: {
    url: "/es",
    title: site.seoTitle.es,
    description: site.seoDescription.es,
    locale: "es_ES",
    alternateLocale: ["en_US"],
  },
  twitter: { title: site.seoTitle.es, description: site.seoDescription.es },
};

export default function Page() {
  return <HomePage locale="es" />;
}
