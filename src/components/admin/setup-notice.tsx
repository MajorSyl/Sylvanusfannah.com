import { Settings2 } from "lucide-react";

export function SetupNotice({ title, description, vars }: { title: string; description: string; vars: string[] }) {
  return (
    <div className="glass mx-auto max-w-lg p-8">
      <span className="grid size-11 place-items-center rounded-2xl bg-amber-50 text-amber-600">
        <Settings2 className="size-5" aria-hidden="true" />
      </span>
      <h1 className="mt-5 text-2xl font-bold tracking-tight">{title}</h1>
      <p className="mt-2 text-muted">{description}</p>
      {vars.length ? (
        <ul className="mt-5 space-y-2">
          {vars.map((v) => (
            <li key={v} className="rounded-xl border border-line bg-white/80 px-3 py-2 font-mono text-sm">
              {v}
            </li>
          ))}
        </ul>
      ) : null}
      <p className="mt-5 text-sm text-muted">
        Add these in Vercel → Project → Settings → Environment Variables, then redeploy. See the README for step-by-step setup.
      </p>
    </div>
  );
}
