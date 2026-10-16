"use client";

import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { useActionState, useEffect, useRef } from "react";
import { submitQuote } from "@/app/actions";
import { budgetOptions, contact, services, timelineOptions, type Locale } from "@/content";
import type { QuoteField, QuoteFormState } from "@/lib/quote-schema";
import { Turnstile, type TurnstileHandle } from "./turnstile";

const initialState: QuoteFormState = { status: "idle" };

export function QuoteForm({ locale, turnstileSiteKey }: { locale: Locale; turnstileSiteKey?: string }) {
  const [state, action, pending] = useActionState(submitQuote, initialState);
  const f = contact.form;
  const formRef = useRef<HTMLFormElement>(null);
  const turnstileRef = useRef<TurnstileHandle>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  const invalid = (field: QuoteField) => state.status === "error" && state.fields?.includes(field);

  useEffect(() => {
    if (state.status === "success") formRef.current?.reset();
    if (state.status !== "idle") {
      turnstileRef.current?.reset();
      statusRef.current?.focus();
    }
  }, [state]);

  if (state.status === "success") {
    return (
      <motion.div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex min-h-[420px] flex-col items-center justify-center text-center outline-none"
      >
        <span className="grid size-16 place-items-center rounded-full bg-emerald-50 text-emerald-600">
          <CheckCircle2 className="size-8" aria-hidden="true" />
        </span>
        <p className="mt-6 max-w-sm text-lg font-semibold">{f.success[locale]}</p>
      </motion.div>
    );
  }

  const fieldError = (field: QuoteField) =>
    invalid(field) ? (
      <p id={`${field}-error`} className="mt-1.5 text-sm text-red-600">
        {f.fieldErrors[field][locale]}
      </p>
    ) : null;

  const aria = (field: QuoteField) => ({
    "aria-invalid": invalid(field) || undefined,
    "aria-describedby": invalid(field) ? `${field}-error` : undefined,
  });

  return (
    <form ref={formRef} action={action} noValidate className="grid gap-5">
      <input type="hidden" name="locale" value={locale} />
      {/* Honeypot — hidden from people and assistive tech */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="label">{f.name[locale]}</label>
          <input id="name" name="name" required maxLength={100} autoComplete="name" className="field" {...aria("name")} />
          {fieldError("name")}
        </div>
        <div>
          <label htmlFor="email" className="label">{f.email[locale]}</label>
          <input id="email" name="email" type="email" required maxLength={200} autoComplete="email" inputMode="email" className="field" {...aria("email")} />
          {fieldError("email")}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="company" className="label">{f.company[locale]}</label>
          <input id="company" name="company" maxLength={120} autoComplete="organization" className="field" {...aria("company")} />
          {fieldError("company")}
        </div>
        <div>
          <label htmlFor="service" className="label">{f.service[locale]}</label>
          <select id="service" name="service" required defaultValue="" className="field select" {...aria("service")}>
            <option value="" disabled>{f.servicePlaceholder[locale]}</option>
            {services.categories.map((c) => (
              <option key={c.id} value={c.id}>{c.title[locale]}</option>
            ))}
          </select>
          {fieldError("service")}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="budget" className="label">{f.budget[locale]}</label>
          <select id="budget" name="budget" required defaultValue="" className="field select" {...aria("budget")}>
            <option value="" disabled>{f.budgetPlaceholder[locale]}</option>
            {budgetOptions.map((o) => (
              <option key={o.value} value={o.value}>{o.label[locale]}</option>
            ))}
          </select>
          {fieldError("budget")}
        </div>
        <div>
          <label htmlFor="timeline" className="label">{f.timeline[locale]}</label>
          <select id="timeline" name="timeline" required defaultValue="" className="field select" {...aria("timeline")}>
            <option value="" disabled>{f.timelinePlaceholder[locale]}</option>
            {timelineOptions.map((o) => (
              <option key={o.value} value={o.value}>{o.label[locale]}</option>
            ))}
          </select>
          {fieldError("timeline")}
        </div>
      </div>

      <div>
        <label htmlFor="message" className="label">{f.message[locale]}</label>
        <textarea id="message" name="message" required minLength={20} maxLength={5000} rows={5} placeholder={f.messagePlaceholder[locale]} className="field resize-y" {...aria("message")} />
        {fieldError("message")}
      </div>

      {turnstileSiteKey ? <Turnstile ref={turnstileRef} siteKey={turnstileSiteKey} language={locale} /> : null}

      <div ref={statusRef} tabIndex={-1} aria-live="polite" className="outline-none">
        <AnimatePresence>
          {state.status === "error" ? (
            <motion.p
              role="alert"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-start gap-2.5 rounded-2xl border border-red-100 bg-red-50/80 px-4 py-3 text-sm text-red-700"
            >
              <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              {f.errors[state.code][locale]}
            </motion.p>
          ) : null}
        </AnimatePresence>
      </div>

      <div className="flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted">{f.privacy[locale]}</p>
        <button type="submit" disabled={pending} className="btn-brand h-12 px-7 text-[15px]">
          {pending ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              {f.submitting[locale]}
            </>
          ) : (
            <>
              {f.submit[locale]}
              <ArrowRight className="size-4" aria-hidden="true" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
