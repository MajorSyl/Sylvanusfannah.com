import { boolean, index, pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const quoteStatus = pgEnum("quote_status", ["new", "quoted", "won", "lost"]);

export const quoteRequests = pgTable(
  "quote_requests",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    company: text("company"),
    service: text("service").notNull(),
    budget: text("budget").notNull(),
    timeline: text("timeline").notNull(),
    message: text("message").notNull(),
    locale: text("locale").notNull().default("en"),
    status: quoteStatus("status").notNull().default("new"),
    isRead: boolean("is_read").notNull().default(false),
    ipHash: text("ip_hash"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index("quote_requests_created_at_idx").on(table.createdAt),
    index("quote_requests_status_idx").on(table.status),
    index("quote_requests_ip_hash_idx").on(table.ipHash, table.createdAt),
  ],
);

export type QuoteRequest = typeof quoteRequests.$inferSelect;
export type NewQuoteRequest = typeof quoteRequests.$inferInsert;
export type QuoteStatus = (typeof quoteStatus.enumValues)[number];
export const QUOTE_STATUSES = quoteStatus.enumValues;
