"use client";

import { ChevronDown, Mail, MailOpen, Reply, Trash2 } from "lucide-react";
import { useState, useTransition } from "react";
import { deleteQuote, setRead, updateStatus } from "@/app/admin/actions";
import type { QuoteRequest, QuoteStatus } from "@/db/schema";
import { cn } from "@/lib/cn";
import { budgetLabel, serviceLabel, timelineLabel } from "@/lib/labels";

const statusStyles: Record<QuoteStatus, string> = {
  new: "bg-brand-50 text-brand",
  quoted: "bg-amber-50 text-amber-700",
  won: "bg-emerald-50 text-emerald-700",
  lost: "bg-slate-100 text-slate-600",
};

const statuses: { value: QuoteStatus; label: string }[] = [
  { value: "new", label: "New" },
  { value: "quoted", label: "Quoted" },
  { value: "won", label: "Won" },
  { value: "lost", label: "Lost" },
];

const fd = (entries: Record<string, string>) => {
  const f = new FormData();
  for (const [k, v] of Object.entries(entries)) f.set(k, v);
  return f;
};

export function QuoteCard({ quote }: { quote: QuoteRequest }) {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  const date = new Date(quote.createdAt);
  const replyHref = `mailto:${quote.email}?subject=${encodeURIComponent(
    `Re: your ${serviceLabel(quote.service)} project`,
  )}&body=${encodeURIComponent(`Hi ${quote.name.split(" ")[0]},\n\nThank you for reaching out about your project.\n\n`)}`;

  const toggleOpen = () => {
    const next = !open;
    setOpen(next);
    if (next && !quote.isRead) startTransition(() => setRead(fd({ id: quote.id, isRead: "true" })));
  };

  return (
    <article className={cn("glass overflow-hidden rounded-2xl transition", pending && "opacity-60", !quote.isRead && "border-l-4 border-l-brand")}>
      <button
        type="button"
        onClick={toggleOpen}
        aria-expanded={open}
        className="flex w-full items-start gap-3 p-4 text-left sm:items-center sm:p-5"
      >
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className={cn("truncate text-base", quote.isRead ? "font-medium" : "font-bold")}>{quote.name}</h2>
            {!quote.isRead ? <span className="rounded-full bg-brand px-2 py-0.5 text-[10px] font-semibold text-white uppercase">Unread</span> : null}
            <span className={cn("rounded-full px-2 py-0.5 text-xs font-semibold", statusStyles[quote.status])}>
              {statuses.find((s) => s.value === quote.status)?.label}
            </span>
          </div>
          <p className="mt-1 truncate text-sm text-muted">
            {serviceLabel(quote.service)} · {budgetLabel(quote.budget)}
            {quote.company ? ` · ${quote.company}` : ""}
          </p>
        </div>
        <time dateTime={date.toISOString()} className="shrink-0 text-xs text-muted" suppressHydrationWarning>
          {date.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}
        </time>
        <ChevronDown className={cn("mt-0.5 size-4 shrink-0 text-muted transition", open && "rotate-180")} aria-hidden="true" />
      </button>

      {open ? (
        <div className="border-t border-line/80 p-4 sm:p-5">
          <dl className="grid gap-x-6 gap-y-3 text-sm sm:grid-cols-2">
            <Item label="Email">
              <a href={`mailto:${quote.email}`} className="text-brand hover:underline">{quote.email}</a>
            </Item>
            <Item label="Company">{quote.company || "—"}</Item>
            <Item label="Service">{serviceLabel(quote.service)}</Item>
            <Item label="Budget">{budgetLabel(quote.budget)}</Item>
            <Item label="Timeline">{timelineLabel(quote.timeline)}</Item>
            <Item label="Received">
              <span suppressHydrationWarning>{date.toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" })}</span>
              {quote.locale === "es" ? <span className="ml-2 text-xs text-muted">(Spanish)</span> : null}
            </Item>
          </dl>
          <div className="mt-4">
            <p className="text-xs font-semibold tracking-wider text-muted uppercase">Message</p>
            <p className="mt-1.5 rounded-xl bg-white/80 p-4 text-sm leading-relaxed whitespace-pre-wrap">{quote.message}</p>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            <a href={replyHref} className="btn-brand h-10 min-h-10 px-4">
              <Reply className="size-4" aria-hidden="true" />
              Reply by email
            </a>
            <label className="sr-only" htmlFor={`status-${quote.id}`}>Status</label>
            <select
              id={`status-${quote.id}`}
              value={quote.status}
              disabled={pending}
              onChange={(e) => startTransition(() => updateStatus(fd({ id: quote.id, status: e.target.value })))}
              className="field select h-10 w-auto rounded-full py-0 text-sm"
            >
              {statuses.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
            <button
              type="button"
              disabled={pending}
              onClick={() => startTransition(() => setRead(fd({ id: quote.id, isRead: String(!quote.isRead) })))}
              className="btn-ghost h-10 min-h-10 px-4"
            >
              {quote.isRead ? <Mail className="size-4" aria-hidden="true" /> : <MailOpen className="size-4" aria-hidden="true" />}
              {quote.isRead ? "Mark unread" : "Mark read"}
            </button>
            <button
              type="button"
              disabled={pending}
              onClick={() => {
                if (confirm(`Delete the request from ${quote.name}? This cannot be undone.`)) {
                  startTransition(() => deleteQuote(fd({ id: quote.id })));
                }
              }}
              className="btn ml-auto h-10 min-h-10 border border-red-100 bg-red-50/80 px-4 text-red-700 hover:bg-red-100"
            >
              <Trash2 className="size-4" aria-hidden="true" />
              Delete
            </button>
          </div>
        </div>
      ) : null}
    </article>
  );
}

function Item({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="text-xs font-semibold tracking-wider text-muted uppercase">{label}</dt>
      <dd className="mt-0.5 break-words">{children}</dd>
    </div>
  );
}
