"use server";

import { headers } from "next/headers";
import { getDb, schema } from "@/db";
import { sendQuoteAlert } from "@/lib/email";
import { isDbConfigured, isEmailConfigured } from "@/lib/env";
import { hashIp, isRateLimited } from "@/lib/rate-limit";
import { quoteSchema, type QuoteField, type QuoteFormState } from "@/lib/quote-schema";
import { verifyTurnstile } from "@/lib/turnstile";

async function clientIp() {
  const h = await headers();
  return (
    h.get("x-real-ip") ??
    h.get("cf-connecting-ip") ??
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown"
  );
}

export async function submitQuote(_prev: QuoteFormState, formData: FormData): Promise<QuoteFormState> {
  // Honeypot: real visitors never fill this hidden field. Pretend success for bots.
  if (String(formData.get("website") ?? "").length > 0) return { status: "success" };

  if (!isDbConfigured() && !isEmailConfigured()) {
    return { status: "error", code: "unavailable" };
  }

  const parsed = quoteSchema.safeParse({
    name: formData.get("name") ?? "",
    email: formData.get("email") ?? "",
    company: formData.get("company") ?? "",
    service: formData.get("service") ?? "",
    budget: formData.get("budget") ?? "",
    timeline: formData.get("timeline") ?? "",
    message: formData.get("message") ?? "",
    locale: formData.get("locale") ?? "en",
  });

  if (!parsed.success) {
    const fields = [...new Set(parsed.error.issues.map((i) => String(i.path[0])))] as QuoteField[];
    return { status: "error", code: "validation", fields };
  }

  const ip = await clientIp();
  const ipHash = hashIp(ip);

  if (await isRateLimited(ipHash)) return { status: "error", code: "rateLimit" };

  const token = formData.get("cf-turnstile-response");
  const human = await verifyTurnstile(typeof token === "string" ? token : null, ip === "unknown" ? undefined : ip);
  if (!human) return { status: "error", code: "captcha" };

  const quote = parsed.data;
  let saved = false;
  const db = getDb();
  if (db) {
    try {
      await db.insert(schema.quoteRequests).values({
        name: quote.name,
        email: quote.email,
        company: quote.company || null,
        service: quote.service,
        budget: quote.budget,
        timeline: quote.timeline,
        message: quote.message,
        locale: quote.locale,
        ipHash,
      });
      saved = true;
    } catch (error) {
      console.error("[quote] database insert failed", error);
    }
  }

  const emailed = await sendQuoteAlert(quote);

  if (!saved && !emailed) return { status: "error", code: "generic" };
  return { status: "success" };
}
