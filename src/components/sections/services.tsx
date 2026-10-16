import { BarChart3, Bot, Briefcase, Code2 } from "lucide-react";
import { services, type Locale, type ServiceCategory } from "@/content";
import { Reveal } from "../reveal";
import { SectionHeading } from "../section-heading";

const icons: Record<ServiceCategory["icon"], typeof Bot> = {
  bot: Bot,
  code: Code2,
  chart: BarChart3,
  briefcase: Briefcase,
};

export function Services({ locale }: { locale: Locale }) {
  return (
    <section id="services" className="py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow={services.eyebrow[locale]}
          heading={services.heading[locale]}
          intro={services.intro[locale]}
        />
        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {services.categories.map((cat, i) => {
            const Icon = icons[cat.icon];
            return (
              <Reveal key={cat.id} delay={(i % 2) * 0.08} className="h-full">
                <article className="glass group flex h-full flex-col p-7 transition duration-300 hover:-translate-y-1 hover:[box-shadow:var(--shadow-lift)] sm:p-8">
                  <div className="flex items-start gap-4">
                    <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-brand to-accent text-white shadow-[0_8px_20px_-8px_rgba(11,92,255,0.6)]">
                      <Icon className="size-5.5" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="font-mono text-xs text-muted">0{i + 1}</p>
                      <h3 className="text-xl font-bold tracking-tight">{cat.title[locale]}</h3>
                    </div>
                  </div>
                  <p className="mt-4 text-[15px] text-muted">{cat.summary[locale]}</p>
                  <ul className="mt-6 space-y-3 border-t border-line/80 pt-6">
                    {cat.items.map((item) => (
                      <li key={item.title.en} className="flex gap-3">
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                        <div>
                          <p className="font-semibold text-ink">{item.title[locale]}</p>
                          <p className="mt-0.5 text-sm leading-relaxed text-muted">{item.description[locale]}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
