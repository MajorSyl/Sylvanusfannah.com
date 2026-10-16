import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-dvh place-items-center px-6">
      <div className="glass max-w-md p-10 text-center">
        <p className="eyebrow">404</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight">Page not found</h1>
        <p className="mt-3 text-muted">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
        <Link href="/" className="btn-primary mt-8">
          Back to home
        </Link>
      </div>
    </main>
  );
}
