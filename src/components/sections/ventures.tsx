import { ArrowUpRight } from "lucide-react";
import { ventures, type Locale } from "@/content";
import { Reveal } from "../reveal";
import { SectionHeading } from "../section-heading";

export function Ventures({ locale }: { locale: Locale }) {
  return (
    <section id="ventures" className="py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading eyebrow={ventures.eyebrow[locale]} heading={ventures.heading[locale]} intro={ventures.intro[locale]} />
        <Reveal className="glass mt-14 divide-y divide-line/80 overflow-hidden p-0">
          {ventures.items.map((v) => {
            const inner = (
              <>
                <div className="flex min-w-0 flex-1 flex-col gap-1 sm:flex-row sm:items-center sm:gap-8">
                  <h3 className="w-40 shrink-0 text-lg font-bold tracking-tight">{v.name}</h3>
                  <p className="text-[15px] text-muted">{v.description[locale]}</p>
                </div>
                {v.url ? (
                  <span className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-brand">
                    <span className="sr-only sm:not-sr-only">{ventures.linkLabel[locale]}</span>
                    <ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                  </span>
                ) : (
                  <span className="shrink-0 text-xs font-medium text-muted">{ventures.soonLabel[locale]}</span>
                )}
              </>
            );
            const cls = "group flex items-center justify-between gap-4 px-6 py-5 sm:px-8 sm:py-6";
            return v.url ? (
              <a key={v.name} href={v.url} target="_blank" rel="noopener noreferrer" className={`${cls} transition hover:bg-white/70`}>
                {inner}
              </a>
            ) : (
              <div key={v.name} className={cls}>
                {inner}
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
