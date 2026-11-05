import React, { useEffect, useState } from "react";
import { Linkedin, Mail, MapPin, ArrowUpRight, Send } from "lucide-react";

import portraitImg from "./assets/portrait.jpg";
import VentureShowcase from "./components/VentureShowcase";

const PORTRAIT_SRC = portraitImg;

const SPEC = [
  { k: "Based", v: "South America" },
  { k: "Education", v: "B.Eng. Electronics & Telecommunication — Njala University, 2022" },
  { k: "Certifications", v: "Google Cloud Infrastructure (2025) · Web & Mobile Dev, Orange Digital Center × Simplon.co (2022) · Digital Marketing, Bluecrest (2021)" },
  { k: "Languages", v: "English, Spanish" },
  { k: "Frontend", v: "React · Next.js · React Native (Expo) · Tailwind CSS" },
  { k: "Backend", v: "TypeScript · JavaScript · Node.js · Express · Python · REST APIs" },
  { k: "Data", v: "SQL · PostgreSQL · MongoDB · Supabase · Firebase" },
  { k: "Cloud & DevOps", v: "AWS · Google Cloud · Cloudflare · Vercel · Docker · GitHub Actions (CI/CD) · Git" },
  { k: "AI & automation", v: "LLM APIs · AI chatbots · Workflow automation" },
];

const PROJECTS = [
  {
    name: "Easyfen",
    role: "Founder · Lead developer",
    desc: "A real estate platform for Sierra Leone: real listings from Freetown to Bo, Kenema and Makeni, with buyers messaging agents directly. Web and mobile.",
    url: "https://easyfen.com",
    domain: "easyfen.com",
    shot: "/shots/easyfen.jpg",
  },
  {
    name: "Sylkit",
    role: "Founder",
    desc: "A marketplace where businesses buy ready-made or custom software: point of sale, inventory, websites, mobile apps and AI tools.",
    url: "https://sylkit.com",
    domain: "sylkit.com",
    shot: "/shots/sylkit.jpg",
  },
  {
    name: "AIIAC Group",
    role: "Website · IT support",
    desc: "The company website, plus ongoing IT support and business email setup for the team.",
    url: "https://aiiacgroup.ltd",
    domain: "aiiacgroup.ltd",
    shot: "/shots/aiiac.jpg",
  },
  {
    name: "Rotary Club of Freetown-Sunset",
    role: "Website · Web app",
    desc: "The club's website and a web app for its members and projects.",
    url: "https://rcfsunset.org",
    domain: "rcfsunset.org",
    shot: "/shots/rcfs.jpg",
  },
];

function ProjectCard({ p }) {
  const [imgOk, setImgOk] = useState(true);
  return (
    <a
      href={p.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col overflow-hidden rounded-lg border border-[#1B2836] bg-[#0E1620] transition-colors hover:border-[#3E556B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C77A42]"
    >
      <div className="relative aspect-[16/10] overflow-hidden border-b border-[#1B2836] bg-[#111c26]">
        {imgOk ? (
          <img
            src={p.shot}
            alt={`Screenshot of ${p.domain}`}
            loading="lazy"
            onError={() => setImgOk(false)}
            className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
          />
        ) : (
          <div className="grid h-full place-items-center font-mono text-sm text-[#5F7488]">{p.domain}</div>
        )}
      </div>
      <div className="flex flex-1 flex-col px-5 py-5">
        <span className="font-mono text-[11px] tracking-[0.2em] text-[#C77A42] uppercase">{p.role}</span>
        <h3 className="mt-2 text-lg font-bold text-[#E7EDF3]">{p.name}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-[#9FB0C1]">{p.desc}</p>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#C77A42] group-hover:text-[#d68a52]">
          {p.domain}
          <ArrowUpRight size={14} />
        </span>
      </div>
    </a>
  );
}

function ContactForm() {
  const [status, setStatus] = useState({ kind: "", text: "" });
  const [sending, setSending] = useState(false);
  const [openedAt] = useState(() => Date.now());

  async function onSubmit(e) {
    e.preventDefault();
    const f = e.currentTarget;
    const field = (n) => f.elements.namedItem(n).value;
    const data = {
      name: field("name").trim(),
      email: field("email").trim(),
      message: field("message").trim(),
      website: field("website"),
      t: Date.now() - openedAt,
    };
    if (!data.name || !data.email || !data.message) {
      setStatus({ kind: "err", text: "Fill in your name, email and message." });
      return;
    }
    setSending(true);
    setStatus({ kind: "", text: "Sending..." });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok) {
        f.reset();
        setStatus({ kind: "ok", text: "Message sent. I'll reply to your email." });
      } else {
        setStatus({ kind: "err", text: json.error || "The message didn't send. Try again, or email sylvanus@sylkit.com." });
      }
    } catch {
      setStatus({ kind: "err", text: "No connection. Try again, or email sylvanus@sylkit.com." });
    } finally {
      setSending(false);
    }
  }

  const input =
    "w-full rounded-md border border-[#243343] bg-[#0E1620] px-4 py-3 text-sm text-[#E7EDF3] placeholder-[#4A6178] focus:border-[#C77A42] focus:outline-none";

  return (
    <form onSubmit={onSubmit} noValidate className="mx-auto mt-10 grid max-w-lg gap-4 text-left">
      <label className="grid gap-1.5 text-sm font-semibold text-[#C9D5E0]">
        Your name
        <input name="name" autoComplete="name" required maxLength={100} className={input} />
      </label>
      <label className="grid gap-1.5 text-sm font-semibold text-[#C9D5E0]">
        Your email
        <input name="email" type="email" autoComplete="email" required maxLength={200} className={input} />
      </label>
      <label className="grid gap-1.5 text-sm font-semibold text-[#C9D5E0]">
        What do you need?
        <textarea name="message" required maxLength={4000} rows={5} className={input} />
      </label>
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Leave this empty
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <button
        type="submit"
        disabled={sending}
        className="inline-flex items-center justify-center gap-2 rounded-md bg-[#C77A42] px-5 py-3 text-sm font-semibold text-[#0B121A] transition-colors hover:bg-[#d68a52] disabled:opacity-60"
      >
        <Send size={16} />
        Send message
      </button>
      <p
        role="status"
        aria-live="polite"
        className={`min-h-[1.25rem] text-sm ${
          status.kind === "ok" ? "text-[#5fd0c9]" : status.kind === "err" ? "text-[#ff9d96]" : "text-[#9FB0C1]"
        }`}
      >
        {status.text}
      </p>
    </form>
  );
}

function useIn() {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setOn(true), 80);
    return () => clearTimeout(t);
  }, []);
  return on;
}

function Eyebrow({ children }) {
  return (
    <div className="flex items-center gap-2 font-mono text-[11px] tracking-[0.25em] text-[#C77A42] uppercase">
      <span className="inline-block w-4 h-px bg-[#C77A42]" />
      {children}
    </div>
  );
}

export default function App() {
  const shown = useIn();

  return (
    <div className="min-h-screen w-full bg-[#0B121A] text-[#E7EDF3] font-sans selection:bg-[#C77A42] selection:text-[#0B121A]">
      <style>{`
        @keyframes riseIn { from { opacity:0; transform: translateY(12px);} to { opacity:1; transform: translateY(0);} }
        .rise { opacity: 0; animation: riseIn .6s cubic-bezier(.4,0,.2,1) forwards; }
        @media (prefers-reduced-motion: reduce) {
          .rise { animation: none !important; opacity: 1 !important; }
        }
        .font-mono { font-family: ui-monospace, "SF Mono", "JetBrains Mono", Menlo, Consolas, monospace; }
      `}</style>

      {/* ===== HERO ===== */}
      <header className="max-w-5xl mx-auto px-6 md:px-10 pt-20 pb-14 md:pt-24 md:pb-16">
        {shown && (
          <div className="rise" style={{ animationDelay: "60ms" }}>
            <Eyebrow>Full-Stack Developer · Founder</Eyebrow>
            <h1 className="mt-5 font-mono font-bold leading-[1.02] text-4xl md:text-6xl tracking-tight">
              Sylvanus Fannah
            </h1>
            <p className="mt-6 max-w-md text-[#9FB0C1] text-base md:text-lg leading-relaxed">
              I design and build systems — for the three companies I run,
              and for clients who hire me as a consultant.
            </p>
            <div className="mt-5 flex items-center gap-1.5 text-sm text-[#6B7F92]">
              <MapPin size={14} />
              <span>South America</span>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="https://www.linkedin.com/in/sylvanus-fannah-b2a896216"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#C77A42] text-[#0B121A] text-sm font-semibold px-5 py-2.5 rounded-md hover:bg-[#d68a52] transition-colors"
              >
                <Linkedin size={16} />
                Connect on LinkedIn
              </a>
              <a
                href="mailto:sylvanus@sylkit.com"
                className="inline-flex items-center gap-2 border border-[#243343] text-[#E7EDF3] text-sm font-semibold px-5 py-2.5 rounded-md hover:border-[#3E556B] transition-colors"
              >
                <Mail size={16} />
                Email me
              </a>
            </div>
          </div>
        )}
      </header>

      {/* ===== SELECTED WORK ===== */}
      <section className="max-w-5xl mx-auto px-6 md:px-10 pb-14 md:pb-20">
        {shown && (
          <div className="rise" style={{ animationDelay: "80ms" }}>
            <Eyebrow>Selected work</Eyebrow>
            <h2 className="mt-4 font-mono text-2xl md:text-3xl font-bold">Projects I&apos;ve built</h2>
            <p className="mt-4 max-w-xl text-[#9FB0C1] leading-relaxed">
              Live products for my own companies and for clients who hire me as a consultant on web
              and mobile apps, business systems and software.
            </p>
          </div>
        )}
        <div className={`mt-8 grid gap-5 sm:grid-cols-2 ${shown ? "rise" : ""}`} style={{ animationDelay: "160ms" }}>
          {PROJECTS.map((p) => (
            <ProjectCard key={p.name} p={p} />
          ))}
        </div>
      </section>

      {/* ===== VENTURES SHOWCASE (glassmorphic) ===== */}
      <section className="max-w-5xl mx-auto px-6 md:px-10 pb-14 md:pb-20">
        {shown && (
          <div className="rise mb-6" style={{ animationDelay: "80ms" }}>
            <Eyebrow>What I run</Eyebrow>
            <h2 className="mt-4 font-mono text-2xl md:text-3xl font-bold">Three ventures</h2>
          </div>
        )}
        <div style={{ minHeight: 560 }}>
          <VentureShowcase />
        </div>
      </section>

      {/* ===== SPEC SHEET ===== */}
      <section className="max-w-5xl mx-auto px-6 md:px-10 py-10 md:py-14">
        {shown && (
          <div className="rise" style={{ animationDelay: "80ms" }}>
            <Eyebrow>Background</Eyebrow>
            <h2 className="mt-4 font-mono text-2xl md:text-3xl font-bold">Education &amp; skills</h2>
          </div>
        )}

        <div className={`mt-8 rounded-lg border border-[#1B2836] overflow-hidden ${shown ? "rise" : ""}`} style={{ animationDelay: "200ms" }}>
          {SPEC.map((row, i) => (
            <div
              key={row.k}
              className={`grid grid-cols-[110px_1fr] sm:grid-cols-[160px_1fr] gap-4 px-5 py-4 ${
                i % 2 === 1 ? "bg-[#0E1620]" : ""
              } ${i !== SPEC.length - 1 ? "border-b border-[#1B2836]" : ""}`}
            >
              <span className="text-xs uppercase tracking-wide text-[#5F7488] pt-0.5">{row.k}</span>
              <span className="text-sm text-[#C9D5E0] leading-relaxed">{row.v}</span>
            </div>
          ))}
        </div>

        <p className="mt-6 text-sm text-[#5F7488]">
          Off duty: weightlifting, reading, basketball.
        </p>
      </section>

      {/* ===== CONTACT ===== */}
      <footer className="border-t border-[#1B2836]">
        <div className="max-w-5xl mx-auto px-6 md:px-10 py-14 md:py-16 text-center">
          {shown && (
            <div className="rise" style={{ animationDelay: "60ms" }}>
              <h2 className="font-mono text-2xl md:text-3xl font-bold">
                Have a project to plan?
              </h2>
              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <a
                  href="https://www.linkedin.com/in/sylvanus-fannah-b2a896216"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#C77A42] text-[#0B121A] text-sm font-semibold px-5 py-2.5 rounded-md hover:bg-[#d68a52] transition-colors"
                >
                  <Linkedin size={16} />
                  Connect on LinkedIn
                  <ArrowUpRight size={14} />
                </a>
                <a
                  href="mailto:sylvanus@sylkit.com"
                  className="inline-flex items-center gap-2 border border-[#243343] text-[#E7EDF3] text-sm font-semibold px-5 py-2.5 rounded-md hover:border-[#3E556B] transition-colors"
                >
                  <Mail size={16} />
                  sylvanus@sylkit.com
                </a>
              </div>
              <ContactForm />
              <p className="mt-10 text-xs text-[#4A6178]">
                Sylvanus Fannah — South America
              </p>
            </div>
          )}
        </div>
      </footer>
    </div>
  );
}
