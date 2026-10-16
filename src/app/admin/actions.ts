"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { signIn, signOut } from "@/auth";
import { getDb, schema } from "@/db";
import { QUOTE_STATUSES } from "@/db/schema";
import { requireAdmin } from "@/lib/admin";
import { isAuthConfigured } from "@/lib/env";

const idSchema = z.uuid();

function db() {
  const client = getDb();
  if (!client) throw new Error("Database is not configured.");
  return client;
}

export async function updateStatus(formData: FormData) {
  await requireAdmin();
  const id = idSchema.parse(formData.get("id"));
  const status = z.enum(QUOTE_STATUSES).parse(formData.get("status"));
  await db().update(schema.quoteRequests).set({ status, isRead: true }).where(eq(schema.quoteRequests.id, id));
  revalidatePath("/admin");
}

export async function setRead(formData: FormData) {
  await requireAdmin();
  const id = idSchema.parse(formData.get("id"));
  const isRead = formData.get("isRead") === "true";
  await db().update(schema.quoteRequests).set({ isRead }).where(eq(schema.quoteRequests.id, id));
  revalidatePath("/admin");
}

export async function deleteQuote(formData: FormData) {
  await requireAdmin();
  const id = idSchema.parse(formData.get("id"));
  await db().delete(schema.quoteRequests).where(eq(schema.quoteRequests.id, id));
  revalidatePath("/admin");
}

export async function adminSignIn() {
  if (!isAuthConfigured()) return;
  await signIn("github", { redirectTo: "/admin" });
}

export async function adminSignOut() {
  await signOut({ redirectTo: "/" });
}
