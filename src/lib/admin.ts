import "server-only";
import { auth } from "@/auth";
import { env, isAuthConfigured } from "@/lib/env";

/** Returns the session if the current visitor is the configured admin, otherwise null. */
export async function getAdminSession() {
  if (!isAuthConfigured()) return null;
  const session = await auth();
  const login = session?.user?.login?.toLowerCase();
  if (!session || !login || login !== env.adminUsername()) return null;
  return session;
}

export async function requireAdmin() {
  const session = await getAdminSession();
  if (!session) throw new Error("Unauthorized");
  return session;
}
