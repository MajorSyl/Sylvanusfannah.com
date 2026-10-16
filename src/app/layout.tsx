import type { Metadata, Viewport } from "next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { Analytics } from "@vercel/analytics/next";
import { site } from "@/content";
import { siteUrl } from "@/lib/site-url";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: site.seoTitle.en, template: `%s · ${site.name}` },
  description: site.seoDescription.en,
  keywords: site.keywords,
  authors: [{ name: site.name, url: siteUrl }],
  creator: site.name,
  applicationName: site.name,
  alternates: { canonical: "/", languages: { en: "/", es: "/es", "x-default": "/" } },
  openGraph: {
    type: "website",
    url: "/",
    siteName: site.name,
    title: site.seoTitle.en,
    description: site.seoDescription.en,
    locale: "en_US",
    alternateLocale: ["es_ES"],
  },
  twitter: { card: "summary_large_image", title: site.seoTitle.en, description: site.seoDescription.en },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#f6f8fb",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="min-h-dvh font-sans">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
