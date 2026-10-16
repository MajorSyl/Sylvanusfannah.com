import { Award } from "lucide-react";
import { skills, type Locale } from "@/content";
import { Reveal } from "../reveal";
import { SectionHeading } from "../section-heading";

export function Skills({ locale }: { locale: Locale }) {
  return (
    <section id="skills" className="py-20 sm:py-24">
      <div className="container-page">
        <SectionHeading eyebrow={skills.eyebrow[locale]} heading={skills.heading[locale]} />
        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          <Reveal className="glass p-7 sm:p-8">
            <h3 className="text-xs font-semibold tracking-[0.14em] text-muted uppercase">{skills.stackLabel[locale]}</h3>
            <ul className="mt-5 flex flex-wrap gap-2">
              {skills.stack.map((s) => (
                <li key={s} className="rounded-full border border-line bg-white/80 px-3.5 py-1.5 text-sm font-medium text-ink">
                  {s}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.08} className="glass p-7 sm:p-8">
            <h3 className="text-xs font-semibold tracking-[0.14em] text-muted uppercase">{skills.certsLabel[locale]}</h3>
            <ul className="mt-5 space-y-4">
              {skills.certifications.map((c) => (
                <li key={c.title.en} className="flex items-start gap-3">
                  <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand">
                    <Award className="size-4.5" aria-hidden="true" />
                  </span>
                  <div className="flex flex-1 flex-wrap items-baseline justify-between gap-x-3">
                    <div>
                      <p className="font-semibold">{c.title[locale]}</p>
                      <p className="text-sm text-muted">{c.issuer}</p>
                    </div>
                    <span className="font-mono text-sm text-muted">{c.year}</span>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
