import { site, ui, type Locale } from "@/content";
import { siteUrl } from "@/lib/site-url";
import { contact } from "@/content";
import { Background } from "./background";
import { Footer } from "./footer";
import { Header } from "./header";
import { MotionProvider } from "./motion-provider";
import { About } from "./sections/about";
import { CaseStudies } from "./sections/case-studies";
import { Contact } from "./sections/contact";
import { Hero } from "./sections/hero";
import { Services } from "./sections/services";
import { Skills } from "./sections/skills";
import { Ventures } from "./sections/ventures";

export function HomePage({ locale }: { locale: Locale }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    url: locale === "es" ? `${siteUrl}/es` : siteUrl,
    jobTitle: site.role[locale],
    description: site.seoDescription[locale],
    knowsLanguage: ["en", "es"],
    alumniOf: { "@type": "CollegeOrUniversity", name: "Njala University" },
    sameAs: [contact.linkedin.url, "https://easyfen.com"],
  };

  return (
    <MotionProvider>
      <div lang={locale}>
        <a
          href="#main"
          className="sr-only z-[60] rounded-full bg-ink px-4 py-2 text-sm text-white focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
        >
          {ui.skipToContent[locale]}
        </a>
        <Background />
        <Header locale={locale} />
        <main id="main">
          <Hero locale={locale} />
          <Services locale={locale} />
          <CaseStudies locale={locale} />
          <Ventures locale={locale} />
          <About locale={locale} />
          <Skills locale={locale} />
          <Contact locale={locale} />
        </main>
        <Footer locale={locale} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      </div>
    </MotionProvider>
  );
}
