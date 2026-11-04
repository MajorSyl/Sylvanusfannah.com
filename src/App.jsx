import React, { useEffect, useState } from "react";
import { Linkedin, Mail, MapPin, ArrowUpRight } from "lucide-react";

import portraitImg from "./assets/portrait.jpg";
import VentureShowcase from "./components/VentureShowcase";

const PORTRAIT_SRC = portraitImg;

const SPEC = [
  { k: "Based", v: "Caracas, Venezuela" },
  { k: "Education", v: "B.Eng. Electronics & Telecommunication — Njala University, 2022" },
  { k: "Certifications", v: "Google Cloud Infrastructure (2025) · Web & Mobile Dev, Orange Digital Center × Simplon.co (2022) · Digital Marketing, Bluecrest (2021)" },
  { k: "Languages", v: "English, Spanish" },
  { k: "Stack", v: "React · Next.js · TypeScript · Node.js · Express · Python · PostgreSQL · MongoDB · Supabase · Firebase · Tailwind CSS" },
];

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
              I design and build the systems behind three companies — a
              property marketplace, a software studio, and a print shop.
            </p>
            <div className="mt-5 flex items-center gap-1.5 text-sm text-[#6B7F92]">
              <MapPin size={14} />
              <span>Caracas, Venezuela</span>
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
                href="mailto:hello@sylvanusfannah.dev"
                className="inline-flex items-center gap-2 border border-[#243343] text-[#E7EDF3] text-sm font-semibold px-5 py-2.5 rounded-md hover:border-[#3E556B] transition-colors"
              >
                <Mail size={16} />
                Email me
              </a>
            </div>
          </div>
        )}
      </header>

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
                  href="mailto:hello@sylvanusfannah.dev"
                  className="inline-flex items-center gap-2 border border-[#243343] text-[#E7EDF3] text-sm font-semibold px-5 py-2.5 rounded-md hover:border-[#3E556B] transition-colors"
                >
                  <Mail size={16} />
                  hello@sylvanusfannah.dev
                </a>
              </div>
              <p className="mt-10 text-xs text-[#4A6178]">
                Sylvanus Fannah — Caracas, Venezuela
              </p>
            </div>
          )}
        </div>
      </footer>
    </div>
  );
}
