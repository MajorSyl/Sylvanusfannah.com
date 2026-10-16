import { existsSync } from "node:fs";
import path from "node:path";
import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import { hero, site, type Locale } from "@/content";
import { Reveal } from "../reveal";

const hasPhoto = existsSync(path.join(process.cwd(), "public", hero.photo));

export function Hero({ locale }: { locale: Locale }) {
  return (
    <section id="top" className="relative pt-32 pb-20 sm:pt-40 sm:pb-28">
      <div className="container-page grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/90 bg-white/70 px-3.5 py-1.5 text-xs font-medium text-ink-soft shadow-sm backdrop-blur">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60 motion-reduce:hidden" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
              </span>
              {hero.eyebrow[locale]}
            </span>
          </Reveal>

          <Reveal delay={0.05}>
            <p className="mt-7 text-lg font-semibold text-brand sm:text-xl">{hero.name}</p>
            <h1 className="heading-xl mt-2">
              {hero.tagline[locale].split(" ").slice(0, -1).join(" ")}{" "}
              <span className="bg-gradient-to-r from-brand to-accent bg-clip-text text-transparent">
                {hero.tagline[locale].split(" ").slice(-1)}
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">{hero.intro[locale]}</p>
          </Reveal>

          <Reveal delay={0.15} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href="#contact" className="btn-primary h-12 px-7 text-[15px]">
              {hero.primaryCta[locale]}
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
            <a href="#work" className="btn-ghost h-12 px-7 text-[15px]">
              {hero.secondaryCta[locale]}
            </a>
          </Reveal>

          <Reveal delay={0.2}>
            <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-ink-soft">
              {hero.proofPoints.map((p) => (
                <li key={p.en} className="flex items-center gap-2">
                  <span className="grid size-5 place-items-center rounded-full bg-brand-50 text-brand">
                    <Check className="size-3" strokeWidth={3} aria-hidden="true" />
                  </span>
                  {p[locale]}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.1} y={24} className="relative mx-auto w-full max-w-sm lg:max-w-none">
          <div
            aria-hidden="true"
            className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-brand/20 via-accent/15 to-transparent blur-2xl"
          />
          <div className="glass relative overflow-hidden rounded-[2rem] p-2.5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.6rem] bg-gradient-to-br from-brand-50 to-accent-50">
              {hasPhoto ? (
                <Image
                  src={hero.photo}
                  alt={hero.photoAlt[locale]}
                  fill
                  priority
                  sizes="(min-width: 1024px) 420px, 90vw"
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 grid place-items-center" role="img" aria-label={hero.photoAlt[locale]}>
                  <span className="bg-gradient-to-br from-brand to-accent bg-clip-text text-8xl font-bold tracking-tighter text-transparent">
                    SF
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className="glass-strong absolute -bottom-5 -left-3 flex items-center gap-3 rounded-2xl px-4 py-3 sm:-left-8">
            <span className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-brand to-accent text-sm font-bold text-white">
              ✓
            </span>
            <div className="leading-tight">
              <p className="text-sm font-semibold">{site.role[locale]}</p>
              <p className="text-xs text-muted">{locale === "es" ? "Sierra Leona → Sudamérica" : "Sierra Leone → South America"}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
