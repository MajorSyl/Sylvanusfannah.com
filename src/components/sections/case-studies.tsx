import { ArrowUpRight, Clock } from "lucide-react";
import { caseStudies, type Locale } from "@/content";
import { cn } from "@/lib/cn";
import { Reveal } from "../reveal";
import { SectionHeading } from "../section-heading";

export function CaseStudies({ locale }: { locale: Locale }) {
  const { labels } = caseStudies;
  return (
    <section id="work" className="py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow={caseStudies.eyebrow[locale]}
          heading={caseStudies.heading[locale]}
          intro={caseStudies.intro[locale]}
        />
        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          {caseStudies.items.map((cs, i) => (
            <Reveal key={cs.slug} delay={(i % 2) * 0.08} className="h-full">
              <article
                className={cn(
                  "glass relative flex h-full flex-col p-7 transition duration-300 sm:p-8",
                  cs.placeholder ? "border-dashed opacity-80" : "hover:-translate-y-1 hover:[box-shadow:var(--shadow-lift)]",
                )}
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand">
                    {cs.category[locale]}
                  </span>
                  {cs.placeholder ? (
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted">
                      <Clock className="size-3.5" aria-hidden="true" />
                      {labels.comingSoon[locale]}
                    </span>
                  ) : null}
                </div>
                <h3 className="mt-5 text-2xl font-bold tracking-tight">{cs.title}</h3>
                <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Platforms">
                  {cs.platforms.map((p) => (
                    <li key={p} className="rounded-md border border-line bg-white/70 px-2 py-0.5 font-mono text-[11px] text-ink-soft">
                      {p}
                    </li>
                  ))}
                </ul>
                <dl className="mt-6 grid flex-1 gap-5">
                  {(["problem", "built", "result"] as const).map((key) => (
                    <div key={key}>
                      <dt className="text-xs font-semibold tracking-[0.14em] text-muted uppercase">{labels[key][locale]}</dt>
                      <dd className={cn("mt-1.5 leading-relaxed", key === "result" ? "font-semibold text-ink" : "text-ink-soft")}>
                        {cs[key][locale]}
                      </dd>
                    </div>
                  ))}
                </dl>
                {"url" in cs && cs.url ? (
                  <a
                    href={cs.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-7 inline-flex items-center gap-1.5 self-start text-sm font-semibold text-brand hover:underline"
                  >
                    {labels.visit[locale]}
                    <ArrowUpRight className="size-4" aria-hidden="true" />
                  </a>
                ) : null}
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
