import { about, type Locale } from "@/content";
import { Reveal } from "../reveal";
import { SectionHeading } from "../section-heading";

export function About({ locale }: { locale: Locale }) {
  return (
    <section id="about" className="py-20 sm:py-28">
      <div className="container-page grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div>
          <SectionHeading eyebrow={about.eyebrow[locale]} heading={about.heading[locale]} />
          <Reveal delay={0.05} className="mt-8 space-y-5 text-lg leading-relaxed text-ink-soft">
            {about.paragraphs.map((p) => (
              <p key={p.en.slice(0, 24)}>{p[locale]}</p>
            ))}
          </Reveal>
        </div>

        <div className="flex flex-col gap-5">
          <Reveal delay={0.1} className="glass p-7 sm:p-8">
            <ol className="relative space-y-7 border-l border-line pl-6">
              {about.timeline.map((step, i) => (
                <li key={step.label.en} className="relative">
                  <span
                    aria-hidden="true"
                    className="absolute top-1 -left-[31px] grid size-4 place-items-center rounded-full border-2 border-white bg-gradient-to-br from-brand to-accent shadow"
                  />
                  <p className="font-mono text-xs text-muted">0{i + 1}</p>
                  <p className="font-semibold">{step.label[locale]}</p>
                  <p className="text-sm text-muted">{step.detail[locale]}</p>
                </li>
              ))}
            </ol>
          </Reveal>
          <Reveal delay={0.15} className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {about.principles.map((p) => (
              <div key={p.title.en} className="glass rounded-2xl p-5">
                <p className="font-semibold">{p.title[locale]}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted">{p.description[locale]}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
