import { z } from "zod";
import { budgetOptions, services, timelineOptions } from "@/content";

export const serviceIds = services.categories.map((c) => c.id) as [string, ...string[]];
export const budgetValues = budgetOptions.map((o) => o.value) as unknown as [string, ...string[]];
export const timelineValues = timelineOptions.map((o) => o.value) as unknown as [string, ...string[]];

/** Strip control characters (keeps newlines and tabs) and trim. */
const clean = (s: string) => s.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").trim();

export const quoteSchema = z.object({
  name: z.string().transform(clean).pipe(z.string().min(2).max(100)),
  email: z.string().transform(clean).pipe(z.email().max(200)),
  company: z
    .string()
    .optional()
    .transform((v) => (v ? clean(v) : ""))
    .pipe(z.string().max(120)),
  service: z.enum(serviceIds),
  budget: z.enum(budgetValues),
  timeline: z.enum(timelineValues),
  message: z.string().transform(clean).pipe(z.string().min(20).max(5000)),
  locale: z.enum(["en", "es"]).catch("en"),
});

export type QuoteInput = z.infer<typeof quoteSchema>;
export type QuoteField = "name" | "email" | "company" | "service" | "budget" | "timeline" | "message";

export type QuoteFormState =
  | { status: "idle" }
  | { status: "success" }
  | {
      status: "error";
      code: "validation" | "rateLimit" | "captcha" | "unavailable" | "generic";
      fields?: QuoteField[];
    };
