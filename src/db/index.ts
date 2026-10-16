import "server-only";
import { neon } from "@neondatabase/serverless";
import { drizzle, type NeonHttpDatabase } from "drizzle-orm/neon-http";
import { env } from "@/lib/env";
import * as schema from "./schema";

let cached: NeonHttpDatabase<typeof schema> | null = null;

/** Returns the Drizzle client, or null when DATABASE_URL is not configured. */
export function getDb() {
  const url = env.databaseUrl();
  if (!url) return null;
  if (!cached) cached = drizzle(neon(url), { schema });
  return cached;
}

export { schema };
