// Cloudflare Worker: serves the built site from ./dist and handles the contact form.
// Messages are stored in the D1 database bound as DB (table: messages).

const JSON_HEADERS = {
  "content-type": "application/json",
  "x-content-type-options": "nosniff",
  "cache-control": "no-store",
};

function json(body, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: JSON_HEADERS });
}

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

async function handleContact(request, env) {
  if (request.method !== "POST") return json({ error: "Method not allowed." }, 405);

  const url = new URL(request.url);
  const origin = request.headers.get("origin");
  if (origin && new URL(origin).host !== url.host) return json({ error: "Not allowed." }, 403);

  const length = Number(request.headers.get("content-length") || 0);
  if (length > 12000) return json({ error: "Message is too long." }, 413);

  let data;
  try {
    data = await request.json();
  } catch {
    return json({ error: "Invalid request." }, 400);
  }

  const name = String(data.name || "").trim();
  const email = String(data.email || "").trim();
  const message = String(data.message || "").trim();

  // Spam traps: hidden field filled in, or form sent faster than a person can type.
  if (data.website || Number(data.t) < 2000) return json({ ok: true });

  if (!name || name.length > 100) return json({ error: "Enter your name." }, 400);
  if (!EMAIL_RE.test(email) || email.length > 200) {
    return json({ error: "Enter a valid email address so I can reply." }, 400);
  }
  if (!message || message.length > 4000) {
    return json({ error: "Write a message of up to 4,000 characters." }, 400);
  }

  const ip = request.headers.get("cf-connecting-ip") || "";
  const recent = await env.DB.prepare(
    "SELECT COUNT(*) AS n FROM messages WHERE ip = ? AND created_at > datetime('now', '-1 hour')",
  )
    .bind(ip)
    .first();
  if (recent && recent.n >= 5) {
    return json({ error: "Too many messages. Try again later, or email sylvanus@sylkit.com." }, 429);
  }

  await env.DB.prepare("INSERT INTO messages (name, email, message, ip) VALUES (?, ?, ?, ?)")
    .bind(name, email, message, ip)
    .run();

  return json({ ok: true });
}

// Project screenshots live in the SHOTS KV namespace (captured with Cloudflare Browser Rendering).
const SHOT_KEYS = new Set(["easyfen.jpg", "sylkit.jpg", "aiiac.jpg", "rcfs.jpg"]);

async function handleShot(pathname, env) {
  const key = pathname.slice("/shots/".length);
  if (!SHOT_KEYS.has(key)) return new Response("Not found", { status: 404 });
  const body = await env.SHOTS.get(key, "arrayBuffer");
  if (!body) return new Response("Not found", { status: 404 });
  return new Response(body, {
    headers: {
      "content-type": "image/jpeg",
      "cache-control": "public, max-age=86400",
      "x-content-type-options": "nosniff",
    },
  });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname.startsWith("/shots/")) return handleShot(url.pathname, env);
    if (url.pathname === "/api/contact") {
      try {
        return await handleContact(request, env);
      } catch (err) {
        console.error("contact form error", err);
        return json({ error: "Something went wrong. Email sylvanus@sylkit.com instead." }, 500);
      }
    }
    return env.ASSETS.fetch(request);
  },
};
