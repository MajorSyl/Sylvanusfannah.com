import "server-only";
import { createHash } from "node:crypto";
import { and, count, eq, gte } from "drizzle-orm";
import { getDb, schema } from "@/db";
import { env } from "@/lib/env";

const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_PER_WINDOW = 3;

/** In-memory sliding window (per serverless instance) — the first line of defence. */
const hits = new Map<string, number[]>();

export function hashIp(ip: string) {
  return createHash("sha256").update(`${env.rateLimitSalt()}:${ip}`).digest("hex").slice(0, 32);
}

function memoryLimited(key: string) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) {
    for (const [k, v] of hits) if (v.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
  }
  return recent.length > MAX_PER_WINDOW;
}

/**
 * Returns true when the caller should be blocked. Combines a fast in-memory
 * check with a durable check against stored requests (works across instances).
 */
export async function isRateLimited(ipHash: string) {
  if (memoryLimited(ipHash)) return true;

  const db = getDb();
  if (!db) return false;
  try {
    const since = new Date(Date.now() - WINDOW_MS);
    const [row] = await db
      .select({ value: count() })
      .from(schema.quoteRequests)
      .where(and(eq(schema.quoteRequests.ipHash, ipHash), gte(schema.quoteRequests.createdAt, since)));
    return (row?.value ?? 0) >= MAX_PER_WINDOW;
  } catch (error) {
    console.error("[rate-limit] database check failed", error);
    return false;
  }
}
