"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Languages, Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { nav, site, ui, type Locale } from "@/content";
import { cn } from "@/lib/cn";

export function Header({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const home = locale === "es" ? "/es" : "/";
  const otherHref = locale === "es" ? "/" : "/es";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5">
      <div
        className={cn(
          "mx-auto flex h-14 max-w-6xl items-center justify-between rounded-full border px-3 pl-5 transition-all duration-300",
          scrolled || open
            ? "border-white/80 bg-white/70 shadow-[0_8px_30px_-12px_rgba(15,40,90,0.18)] backdrop-blur-xl"
            : "border-transparent bg-transparent",
        )}
      >
        <Link href={home} className="flex items-center gap-2.5 font-semibold tracking-tight" aria-label={site.name}>
          <span className="grid size-8 place-items-center rounded-xl bg-gradient-to-br from-brand to-accent text-[13px] font-bold text-white shadow-sm">
            SF
          </span>
          <span className="hidden sm:inline">{site.name}</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {nav.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-3.5 py-2 text-sm font-medium text-ink-soft transition hover:bg-white/80 hover:text-ink"
            >
              {l.label[locale]}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <Link
            href={otherHref}
            hrefLang={locale === "es" ? "en" : "es"}
            aria-label={ui.languageToggleLabel[locale]}
            className="inline-flex h-10 items-center gap-1.5 rounded-full px-3 text-sm font-medium text-ink-soft transition hover:bg-white/80 hover:text-ink"
          >
            <Languages className="size-4" aria-hidden="true" />
            <span>{locale === "es" ? "EN" : "ES"}</span>
          </Link>
          <a href="#contact" className="btn-primary hidden h-10 min-h-10 px-5 sm:inline-flex">
            {nav.cta[locale]}
          </a>
          <button
            type="button"
            className="grid size-10 place-items-center rounded-full text-ink transition hover:bg-white/80 md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? ui.close[locale] : ui.menu[locale]}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.nav
            id="mobile-menu"
            aria-label="Mobile"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="glass-strong mx-auto mt-2 max-w-6xl p-3 md:hidden"
          >
            {nav.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-2xl px-4 py-3 text-base font-medium text-ink hover:bg-white"
              >
                {l.label[locale]}
              </a>
            ))}
            <a href="#contact" onClick={() => setOpen(false)} className="btn-primary mt-2 w-full">
              {nav.cta[locale]}
            </a>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
