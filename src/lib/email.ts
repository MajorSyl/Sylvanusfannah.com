import "server-only";
import { Resend } from "resend";
import { site } from "@/content";
import { env } from "@/lib/env";
import { budgetLabel, serviceLabel, timelineLabel } from "@/lib/labels";
import type { QuoteInput } from "@/lib/quote-schema";

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

/** Sends the new-quote alert. Returns false (never throws) if email is not configured or fails. */
export async function sendQuoteAlert(quote: QuoteInput) {
  const apiKey = env.resendApiKey();
  const to = env.notificationEmail();
  if (!apiKey || !to) return false;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? `https://${site.domain}`;
  const rows: [string, string][] = [
    ["Name", quote.name],
    ["Email", quote.email],
    ["Company", quote.company || "—"],
    ["Service", serviceLabel(quote.service)],
    ["Budget", budgetLabel(quote.budget)],
    ["Timeline", timelineLabel(quote.timeline)],
    ["Language", quote.locale === "es" ? "Spanish" : "English"],
  ];

  const html = `
  <div style="font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;max-width:600px;margin:0 auto;color:#0b1220">
    <h2 style="margin:0 0 4px;font-size:20px">New quote request</h2>
    <p style="margin:0 0 20px;color:#5b6b82">via ${escapeHtml(site.domain)}</p>
    <table style="width:100%;border-collapse:collapse;font-size:14px">
      ${rows
        .map(
          ([k, v]) =>
            `<tr><td style="padding:8px 0;color:#5b6b82;width:110px;vertical-align:top">${k}</td><td style="padding:8px 0;font-weight:600">${escapeHtml(v)}</td></tr>`,
        )
        .join("")}
    </table>
    <h3 style="margin:24px 0 8px;font-size:15px">Project description</h3>
    <div style="white-space:pre-wrap;background:#f3f7fc;border-radius:12px;padding:16px;font-size:14px;line-height:1.6">${escapeHtml(quote.message)}</div>
    <p style="margin:24px 0 0">
      <a href="mailto:${encodeURIComponent(quote.email)}" style="background:#0b5cff;color:#fff;padding:10px 18px;border-radius:999px;text-decoration:none;font-weight:600;font-size:14px">Reply to ${escapeHtml(quote.name)}</a>
      <a href="${siteUrl}/admin" style="margin-left:12px;color:#0b5cff;font-size:14px">Open dashboard</a>
    </p>
  </div>`;

  const text = [
    "New quote request",
    ...rows.map(([k, v]) => `${k}: ${v}`),
    "",
    quote.message,
    "",
    `Dashboard: ${siteUrl}/admin`,
  ].join("\n");

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: env.resendFrom(),
      to: [to],
      replyTo: quote.email,
      subject: `New quote request: ${serviceLabel(quote.service)} — ${quote.name}`,
      html,
      text,
    });
    if (error) {
      console.error("[email] Resend error", error);
      return false;
    }
    return true;
  } catch (error) {
    console.error("[email] send failed", error);
    return false;
  }
}
