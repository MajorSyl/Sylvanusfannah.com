import "server-only";
import { env } from "@/lib/env";

/**
 * Verifies a Cloudflare Turnstile token. When TURNSTILE_SECRET_KEY is not set,
 * verification is skipped so the site keeps working during setup.
 */
export async function verifyTurnstile(token: string | null, ip?: string) {
  const secret = env.turnstileSecret();
  if (!secret) return true;
  if (!token) return false;

  try {
    const body = new URLSearchParams({ secret, response: token });
    if (ip) body.set("remoteip", ip);
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body,
      cache: "no-store",
    });
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch (error) {
    console.error("[turnstile] verification failed", error);
    return false;
  }
}
