import { count, desc, eq } from "drizzle-orm";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { QuoteCard } from "@/components/admin/quote-card";
import { SetupNotice } from "@/components/admin/setup-notice";
import { getDb, schema } from "@/db";
import { QUOTE_STATUSES, type QuoteRequest, type QuoteStatus } from "@/db/schema";
import { getAdminSession } from "@/lib/admin";
import { isAuthConfigured, missingAuthVars } from "@/lib/env";
import { cn } from "@/lib/cn";
import { adminSignOut } from "./actions";

export const dynamic = "force-dynamic";

const statusLabels: Record<QuoteStatus, string> = { new: "New", quoted: "Quoted", won: "Won", lost: "Lost" };
const statusDot: Record<QuoteStatus, string> = {
  new: "bg-brand",
  quoted: "bg-amber-500",
  won: "bg-emerald-500",
  lost: "bg-slate-400",
};

export default async function AdminPage({ searchParams }: { searchParams: Promise<{ status?: string; view?: string }> }) {
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

  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  const db = getDb();
  const params = await searchParams;
  const status = QUOTE_STATUSES.includes(params.status as QuoteStatus) ? (params.status as QuoteStatus) : undefined;
  const unreadOnly = params.view === "unread";

  let quotes: QuoteRequest[] = [];
  const counts: Record<QuoteStatus, number> = { new: 0, quoted: 0, won: 0, lost: 0 };
  let unread = 0;
  let dbError = false;

  if (db) {
    try {
      const [rows, grouped, unreadRows] = await Promise.all([
        db
          .select()
          .from(schema.quoteRequests)
          .where(status ? eq(schema.quoteRequests.status, status) : undefined)
          .orderBy(desc(schema.quoteRequests.createdAt))
          .limit(500),
        db
          .select({ status: schema.quoteRequests.status, value: count() })
          .from(schema.quoteRequests)
          .groupBy(schema.quoteRequests.status),
        db.select({ value: count() }).from(schema.quoteRequests).where(eq(schema.quoteRequests.isRead, false)),
      ]);
      quotes = unreadOnly ? rows.filter((q) => !q.isRead) : rows;
      for (const g of grouped) counts[g.status] = g.value;
      unread = unreadRows[0]?.value ?? 0;
    } catch (error) {
      console.error("[admin] failed to load quotes", error);
      dbError = true;
    }
  }

  const total = Object.values(counts).reduce((a, b) => a + b, 0);
  const href = (next: { status?: string; view?: string }) => {
    const q = new URLSearchParams();
    if (next.status) q.set("status", next.status);
    if (next.view) q.set("view", next.view);
    const s = q.toString();
    return s ? `/admin?${s}` : "/admin";
  };

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 sm:py-10">
      <header className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-brand to-accent text-sm font-bold text-white">SF</span>
          <div>
            <h1 className="text-xl font-bold tracking-tight">Quote requests</h1>
            <p className="text-xs text-muted">Signed in as @{session.user.login}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/" className="btn-ghost hidden h-10 min-h-10 px-4 sm:inline-flex">View site</Link>
          <form action={adminSignOut}>
            <button type="submit" className="btn-ghost h-10 min-h-10 px-4" aria-label="Sign out">
              <LogOut className="size-4" aria-hidden="true" />
              <span className="hidden sm:inline">Sign out</span>
            </button>
          </form>
        </div>
      </header>

      {!db ? (
        <div className="mt-10">
          <SetupNotice
            title="Database not connected"
            description="Quote requests are stored in Neon Postgres. Add your connection string, then run the migration (see README)."
            vars={["DATABASE_URL"]}
          />
        </div>
      ) : dbError ? (
        <div role="alert" className="glass mt-10 p-6 text-sm text-red-700">
          Couldn&apos;t load quote requests. Check that DATABASE_URL is correct and that you ran <code className="font-mono">npm run db:push</code>.
        </div>
      ) : (
        <>
          <section aria-label="Totals" className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-5">
            <Link
              href={href({})}
              className={cn("glass rounded-2xl p-4 transition hover:bg-white/80", !status && !unreadOnly && "ring-2 ring-brand/40")}
            >
              <p className="text-xs font-medium text-muted">All</p>
              <p className="mt-1 text-2xl font-bold">{total}</p>
              <p className="mt-0.5 text-xs text-muted">{unread} unread</p>
            </Link>
            {QUOTE_STATUSES.map((s) => (
              <Link
                key={s}
                href={href({ status: s })}
                className={cn("glass rounded-2xl p-4 transition hover:bg-white/80", status === s && "ring-2 ring-brand/40")}
              >
                <p className="flex items-center gap-1.5 text-xs font-medium text-muted">
                  <span className={cn("size-2 rounded-full", statusDot[s])} aria-hidden="true" />
                  {statusLabels[s]}
                </p>
                <p className="mt-1 text-2xl font-bold">{counts[s]}</p>
              </Link>
            ))}
          </section>

          <div className="mt-6 flex flex-wrap items-center gap-2 text-sm">
            <span className="text-muted">Show:</span>
            <Link href={href({ status })} className={cn("rounded-full px-3 py-1.5 font-medium", !unreadOnly ? "bg-ink text-white" : "bg-white/70 text-ink-soft")}>
              All
            </Link>
            <Link href={href({ status, view: "unread" })} className={cn("rounded-full px-3 py-1.5 font-medium", unreadOnly ? "bg-ink text-white" : "bg-white/70 text-ink-soft")}>
              Unread
            </Link>
            {status ? (
              <Link href={href({ view: unreadOnly ? "unread" : undefined })} className="ml-auto text-brand hover:underline">
                Clear status filter
              </Link>
            ) : null}
          </div>

          <section aria-label="Requests" className="mt-5 space-y-3">
            {quotes.length === 0 ? (
              <div className="glass p-10 text-center text-muted">No quote requests here yet.</div>
            ) : (
              quotes.map((q) => <QuoteCard key={q.id} quote={q} />)
            )}
          </section>
        </>
      )}
    </main>
  );
}
