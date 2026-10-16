import { redirect } from "next/navigation";
import { SetupNotice } from "@/components/admin/setup-notice";
import { GitHubIcon } from "@/components/icons";
import { getAdminSession } from "@/lib/admin";
import { isAuthConfigured, missingAuthVars } from "@/lib/env";
import { adminSignIn } from "../actions";

export const dynamic = "force-dynamic";

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  if (!isAuthConfigured()) {
    return (
      <main className="grid min-h-dvh place-items-center px-5 py-16">
        <SetupNotice
          title="Admin setup required"
          description="GitHub login for the admin area isn't configured yet. Add the following environment variables:"
          vars={missingAuthVars()}
        />
      </main>
    );
  }

  if (await getAdminSession()) redirect("/admin");
  const { error } = await searchParams;

  return (
    <main className="grid min-h-dvh place-items-center px-5 py-16">
      <div className="glass w-full max-w-sm p-8 text-center">
        <span className="mx-auto grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-brand to-accent font-bold text-white">SF</span>
        <h1 className="mt-5 text-2xl font-bold tracking-tight">Admin</h1>
        <p className="mt-2 text-sm text-muted">Sign in with the authorized GitHub account.</p>
        {error ? (
          <p role="alert" className="mt-5 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error === "AccessDenied" ? "This GitHub account is not authorized." : "Sign-in failed. Please try again."}
          </p>
        ) : null}
        <form action={adminSignIn} className="mt-6">
          <button type="submit" className="btn-primary h-12 w-full">
            <GitHubIcon className="size-5" />
            Continue with GitHub
          </button>
        </form>
      </div>
    </main>
  );
}
