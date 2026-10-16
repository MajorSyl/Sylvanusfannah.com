import { Clock, Globe2, Mail } from "lucide-react";
import { contact, type Locale } from "@/content";
import { LinkedInIcon, WhatsAppIcon } from "../icons";
import { QuoteForm } from "../quote-form";
import { Reveal } from "../reveal";
import { SectionHeading } from "../section-heading";

export function Contact({ locale }: { locale: Locale }) {
  const wa = `https://wa.me/${contact.whatsapp.number}?text=${encodeURIComponent(contact.whatsapp.prefill[locale])}`;
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim() || undefined;

  return (
    <section id="contact" className="py-20 sm:py-28">
      <div className="container-page grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
        <div>
          <SectionHeading eyebrow={contact.eyebrow[locale]} heading={contact.heading[locale]} intro={contact.intro[locale]} />
          <Reveal delay={0.05} className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
            <a href={wa} target="_blank" rel="noopener noreferrer" className="btn h-12 bg-[#25D366] px-6 text-[15px] text-white shadow-[0_10px_24px_-10px_rgba(37,211,102,0.7)] hover:-translate-y-0.5 hover:bg-[#1fbe5a]">
              <WhatsAppIcon className="size-5" />
              {contact.whatsapp.label[locale]}
            </a>
            <a href={contact.linkedin.url} target="_blank" rel="noopener noreferrer" className="btn-ghost h-12 px-6 text-[15px]">
              <LinkedInIcon className="size-4.5 text-[#0A66C2]" />
              {contact.linkedin.label[locale]}
            </a>
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="mt-8 space-y-3 text-[15px] text-ink-soft">
              <li className="flex items-center gap-3">
                <span className="grid size-9 place-items-center rounded-xl bg-white/80 text-brand shadow-sm"><Clock className="size-4" aria-hidden="true" /></span>
                {contact.hours[locale]}
              </li>
              <li className="flex items-center gap-3">
                <span className="grid size-9 place-items-center rounded-xl bg-white/80 text-brand shadow-sm"><Globe2 className="size-4" aria-hidden="true" /></span>
                {contact.languages[locale]}
              </li>
              <li className="flex items-center gap-3">
                <span className="grid size-9 place-items-center rounded-xl bg-white/80 text-brand shadow-sm"><WhatsAppIcon className="size-4" /></span>
                {contact.whatsapp.display}
              </li>
              {contact.showEmail ? (
                <li className="flex items-center gap-3">
                  <span className="grid size-9 place-items-center rounded-xl bg-white/80 text-brand shadow-sm"><Mail className="size-4" aria-hidden="true" /></span>
                  <a href={`mailto:${contact.email}`} className="hover:text-brand">{contact.email}</a>
                </li>
              ) : null}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.08} className="glass-strong relative p-6 sm:p-9">
          <QuoteForm locale={locale} turnstileSiteKey={turnstileSiteKey} />
        </Reveal>
      </div>
    </section>
  );
}
