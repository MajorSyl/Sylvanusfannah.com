# sylvanusfannah.com

Personal brand website for **Sylvanus Fannah**, full-stack developer and founder.
Tagline: *"I build systems that work."*

**Stack:** Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · Neon Postgres + Drizzle ORM · Resend · Auth.js (GitHub) · Cloudflare Turnstile · Vercel Analytics

---

## Quick start

```bash
npm install
cp .env.example .env.local   # fill in what you have; everything is optional for local dev
npm run dev                  # http://localhost:3000
npm run build                # production build
```

The site builds and runs with **no environment variables at all**:

| Missing | What happens |
| --- | --- |
| `DATABASE_URL` **and** `RESEND_API_KEY` | Quote form shows a friendly "not connected yet, use WhatsApp/LinkedIn" message |
| Only one of the two | Form still works (saves to DB, or emails you) |
| Turnstile keys | Widget hidden, verification skipped (honeypot + rate limit still active) |
| Auth variables | `/admin` shows a setup notice listing the missing variables |
| `DATABASE_URL` (admin signed in) | `/admin` shows a "database not connected" notice |

---

## Editing content

**All copy lives in [`src/content.ts`](src/content.ts)**, split into sections: `site`, `nav`, `hero`, `services`, `caseStudies`, `ventures`, `about`, `skills`, `contact`, `footer`, `ui`.
Every string is `{ en, es }` so the language toggle works everywhere. The structure is plain serializable data, ready to map onto Keystatic singletons/collections later without touching components.

Common edits:

- **Your photo**: save it as `public/images/sylvanus.jpg` (portrait, about 1000×1250px). Until it exists, a branded "SF" placeholder is shown. The file is detected at build time, so redeploy after adding it.
- **Show your email**: in `contact`, set `showEmail: true` (the address is already `sylvanus@sylvanusfannah.com`).
- **Venture links**: fill `url` for Syl Express, Sylprint and Talu in `ventures.items` (empty = "Website coming soon").
- **Placeholder case studies**: edit the `ai-chatbot` and `bi-dashboard` items in `caseStudies.items` and remove `placeholder: true`.
- **Budget / timeline options**: `budgetOptions` and `timelineOptions`.

Languages: English at `/`, Spanish at `/es` (static pages, with `hreflang` alternates for SEO).

---

## Service setup (step by step)

### 1. Neon Postgres (stores quote requests)

1. Sign up at <https://neon.tech> and create a **New project** (pick the region closest to your Vercel region, e.g. `us-east-1`).
2. On the project dashboard click **Connect** and copy the **pooled** connection string.
3. Set `DATABASE_URL` in `.env.local` (and in Vercel).
4. Create the table:
   ```bash
   npm run db:push        # applies src/db/schema.ts directly
   # or: npm run db:migrate  (uses the SQL in /drizzle)
   ```
   Tip: in Vercel you can also add Neon via **Storage → Marketplace → Neon**, which sets `DATABASE_URL` automatically. You still need to run `npm run db:push` once locally with that URL.

### 2. Resend (email alert for each new request)

1. Sign up at <https://resend.com>, go to **API Keys → Create API key** (Sending access) and set `RESEND_API_KEY`.
2. Set `QUOTE_NOTIFICATION_EMAIL` to **the email address you signed up to Resend with**. Until you verify a domain, Resend only delivers to that address.
3. Leave `RESEND_FROM_EMAIL` as `Sylvanus Fannah Website <onboarding@resend.dev>` for now.
4. **Later, after verifying your domain:** Resend → **Domains** → add `sylvanusfannah.com`, add the DNS records it shows, and wait for "Verified". Then change:
   - `RESEND_FROM_EMAIL=Sylvanus Fannah Website <quotes@sylvanusfannah.com>`
   - `QUOTE_NOTIFICATION_EMAIL=sylvanus@sylvanusfannah.com`

Each alert sets the client's address as **Reply-To**, so pressing "Reply" in your inbox answers the client directly.

### 3. Cloudflare Turnstile (spam protection)

1. Go to <https://dash.cloudflare.com> → **Turnstile** → **Add widget**.
2. Name it and add hostnames: `sylvanusfannah.com`, `www.sylvanusfannah.com`, your `*.vercel.app` domain and `localhost`.
3. Widget mode: **Managed**.
4. Copy the **Site key** into `NEXT_PUBLIC_TURNSTILE_SITE_KEY` and the **Secret key** into `TURNSTILE_SECRET_KEY`.

### 4. Auth.js with GitHub (admin area)

1. GitHub → **Settings → Developer settings → OAuth Apps → New OAuth App**.
   - Homepage URL: `https://sylvanusfannah.com`
   - Authorization callback URL: `https://sylvanusfannah.com/api/auth/callback/github`
2. Copy the **Client ID** into `AUTH_GITHUB_ID`. Generate a **client secret** and put it in `AUTH_GITHUB_SECRET`.
3. Generate `AUTH_SECRET` with `npx auth secret` or `openssl rand -base64 32`.
4. Set `ADMIN_GITHUB_USERNAME` to your GitHub username (case-insensitive). **Only this account can sign in**; anyone else is rejected at sign-in.
5. For local development, create a **second** OAuth app with callback `http://localhost:3000/api/auth/callback/github` and use its credentials in `.env.local` (a GitHub OAuth app allows only one callback URL).

Then visit `/admin`.

### 5. Vercel (hosting + analytics)

1. Push this repo to GitHub, then go to <https://vercel.com/new> and import the repository (framework is auto-detected as Next.js).
2. **Settings → Environment Variables**: add every variable from `.env.example` (Production + Preview).
3. **Analytics** tab → **Enable** Web Analytics (the `<Analytics />` component is already installed).
4. **Settings → Domains**: add `sylvanusfannah.com` and `www.sylvanusfannah.com`, then update DNS at your registrar as instructed.
5. Redeploy after adding or changing environment variables.

---

## Environment variables

| Variable | Required for | Notes |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | SEO | `https://sylvanusfannah.com` (default if unset) |
| `DATABASE_URL` | Saving quotes, admin | Neon pooled connection string |
| `RESEND_API_KEY` | Email alerts | |
| `QUOTE_NOTIFICATION_EMAIL` | Email alerts | Your Resend account email until the domain is verified |
| `RESEND_FROM_EMAIL` | Email alerts | Optional; defaults to `onboarding@resend.dev` |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Spam protection | Public site key |
| `TURNSTILE_SECRET_KEY` | Spam protection | Server-only |
| `AUTH_SECRET` | Admin | Random 32+ byte string |
| `AUTH_GITHUB_ID` | Admin | GitHub OAuth Client ID |
| `AUTH_GITHUB_SECRET` | Admin | GitHub OAuth Client secret |
| `ADMIN_GITHUB_USERNAME` | Admin | The only GitHub account allowed in |
| `RATE_LIMIT_SALT` | Optional | Salt for hashing visitor IPs (falls back to `AUTH_SECRET`) |

Only variables prefixed `NEXT_PUBLIC_` reach the browser. The database URL and all API keys are used only in server code, guarded by `import "server-only"`.

---

## How quote requests work

1. The form posts to a **Next.js server action** (`src/app/actions.ts`).
2. Checks run in order: hidden honeypot field → **zod** validation (`src/lib/quote-schema.ts`) → **rate limit** (3 requests per 10 minutes per hashed IP; in-memory plus a durable check in Postgres) → **Turnstile** verification.
3. The request is saved to Neon (`quote_requests` table), then an email alert is sent via Resend.
4. Visitor IPs are never stored in plain text, only a salted SHA-256 hash used for rate limiting.

## Admin dashboard (`/admin`)

- GitHub sign-in restricted to `ADMIN_GITHUB_USERNAME`; every server action re-checks the session.
- Requests are listed newest first with name, email, company, service, budget, timeline, message and date.
- Status per request: **New / Quoted / Won / Lost**, with counts at the top and filters by status and by unread.
- Mark read/unread (opening a request marks it read), delete (with confirmation), and **Reply by email** (pre-filled mailto).
- No invoicing by design; quotes and invoices are handled in Zoho Invoice.
- `/admin` is `noindex` and disallowed in `robots.txt`.

## SEO

- Per-language metadata, canonical URLs and `hreflang` alternates
- Generated Open Graph / Twitter images (`/opengraph-image`, `/es/opengraph-image`) at 1200×630, so links preview well on WhatsApp and LinkedIn
- `sitemap.xml`, `robots.txt`, web manifest, JSON-LD `Person` schema

## Project structure

```
src/
  content.ts               ← all site copy (EN/ES)
  auth.ts                  ← Auth.js config (GitHub, single-admin allowlist)
  app/
    page.tsx, es/page.tsx  ← English / Spanish home
    actions.ts             ← quote form server action
    admin/                 ← dashboard, login, admin server actions
    api/auth/[...nextauth] ← Auth.js route
    opengraph-image.tsx, sitemap.ts, robots.ts, manifest.ts
  components/              ← sections, header, footer, form, admin UI
  db/                      ← Drizzle schema + Neon client
  lib/                     ← env, email, rate limit, turnstile, validation
drizzle/                   ← generated SQL migrations
```

## Decisions made (defaults you can change)

- **Language toggle** uses separate static routes (`/` and `/es`) instead of client-side switching. This is better for SEO and for link previews in each language.
- **Photo**: no photo was in the repo, so a branded placeholder renders until `public/images/sylvanus.jpg` is added.
- **Venture links**: only Easyfen has a known URL; the others show "Website coming soon" until you add URLs in `content.ts`.
- **Case study #2** is titled "Product Expiry Tracking System" and the client is described generically as "a shopping mall".
- **Rate limiting** uses Postgres plus in-memory checks, so no extra Redis service is needed.
- **Budget ranges** (USD): Under $1k, $1k–3k, $3k–7k, $7k–15k, $15k+, Not sure. **Timelines**: ASAP, within 1 month, 1–3 months, 3+ months, flexible.
- **Reply-time promise** in the contact copy: "within one business day". Edit it in `content.ts` if you prefer something else.
- **Fonts**: Geist, self-hosted via the `geist` package (no external font requests).
