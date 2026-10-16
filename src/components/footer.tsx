import { ArrowUp } from "lucide-react";
import { contact, footer, nav, site, type Locale } from "@/content";
import { LinkedInIcon, WhatsAppIcon } from "./icons";

export function Footer({ locale }: { locale: Locale }) {
  return (
    <footer className="pt-10 pb-10">
      <div className="container-page">
        <div className="glass flex flex-col gap-8 p-7 sm:p-9 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5 font-semibold">
              <span className="grid size-8 place-items-center rounded-xl bg-gradient-to-br from-brand to-accent text-[13px] font-bold text-white">SF</span>
              {site.name}
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted">{footer.line[locale]}</p>
          </div>
          <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-ink-soft">
            {nav.links.map((l) => (
              <a key={l.href} href={l.href} className="hover:text-brand">{l.label[locale]}</a>
            ))}
            <a href="#contact" className="hover:text-brand">{nav.cta[locale]}</a>
          </nav>
          <div className="flex items-center gap-2">
            <a href={`https://wa.me/${contact.whatsapp.number}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="grid size-10 place-items-center rounded-full bg-white/80 text-ink-soft shadow-sm transition hover:text-[#25D366]">
              <WhatsAppIcon className="size-4.5" />
            </a>
            <a href={contact.linkedin.url} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="grid size-10 place-items-center rounded-full bg-white/80 text-ink-soft shadow-sm transition hover:text-[#0A66C2]">
              <LinkedInIcon className="size-4" />
            </a>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-between px-2 text-xs text-muted">
          <p>© {new Date().getFullYear()} {site.name}. {footer.rights[locale]}</p>
          <a href="#top" className="inline-flex items-center gap-1 hover:text-ink">
            {footer.backToTop[locale]} <ArrowUp className="size-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
