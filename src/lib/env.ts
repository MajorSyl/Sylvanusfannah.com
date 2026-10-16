import "server-only";

/** Server-only environment helpers. Nothing here is ever sent to the browser. */

const value = (key: string) => {
  const v = process.env[key]?.trim();
  return v ? v : undefined;
};

export const env = {
  databaseUrl: () => value("DATABASE_URL"),
  resendApiKey: () => value("RESEND_API_KEY"),
  notificationEmail: () => value("QUOTE_NOTIFICATION_EMAIL"),
  resendFrom: () => value("RESEND_FROM_EMAIL") ?? "Sylvanus Fannah Website <onboarding@resend.dev>",
  turnstileSecret: () => value("TURNSTILE_SECRET_KEY"),
  authSecret: () => value("AUTH_SECRET"),
  githubId: () => value("AUTH_GITHUB_ID"),
  githubSecret: () => value("AUTH_GITHUB_SECRET"),
  adminUsername: () => value("ADMIN_GITHUB_USERNAME")?.toLowerCase(),
  rateLimitSalt: () => value("RATE_LIMIT_SALT") ?? value("AUTH_SECRET") ?? "sylvanusfannah",
};

export const isDbConfigured = () => Boolean(env.databaseUrl());
export const isEmailConfigured = () => Boolean(env.resendApiKey() && env.notificationEmail());
export const isTurnstileConfigured = () => Boolean(env.turnstileSecret());
export const isAuthConfigured = () =>
  Boolean(env.authSecret() && env.githubId() && env.githubSecret() && env.adminUsername());

export const missingAuthVars = () =>
  [
    ["AUTH_SECRET", env.authSecret()],
    ["AUTH_GITHUB_ID", env.githubId()],
    ["AUTH_GITHUB_SECRET", env.githubSecret()],
    ["ADMIN_GITHUB_USERNAME", env.adminUsername()],
  ]
    .filter(([, v]) => !v)
    .map(([k]) => k as string);
