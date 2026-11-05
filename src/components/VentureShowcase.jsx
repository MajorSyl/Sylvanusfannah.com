import React from "react";
import portraitImg from "../assets/portrait.jpg";

import GlassCard from "./GlassCard";

const VENTURES = [
  {
    tag: "Venture 01",
    title: "Easyfen",
    desc: "A real estate listing platform connecting buyers, renters and agents through a verified property marketplace, built for web and mobile.",
    offset: "",
  },
  {
    tag: "Venture 02",
    title: "Sylkit",
    desc: "A startup selling ready-made and custom software, apps and websites to businesses, at sylkit.com.",
    offset: "md:ml-12",
  },
  {
    tag: "Venture 03",
    title: "Sylprint",
    desc: "Started in 2023. Now five printing centers across Venezuela — DTF and sublimation printing, merch, ID cards and documents — with thousands of dollars in profit.",
    offset: "",
  },
];

export default function VentureShowcase() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-white/10">
      {/* background gradient wash */}
      <div className="absolute inset-0 bg-gradient-to-br from-ink-900 via-ink-950 to-ink-950" />

      {/* portrait, bled to the right edge, full height of the panel */}
      <div className="absolute inset-y-0 right-0 w-full sm:w-[62%] md:w-[52%]">
        <img
          src={portraitImg}
          alt="Sylvanus Fannah"
          className="h-full w-full object-cover object-top opacity-25 sm:opacity-100"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, #060a0e 0%, rgba(6,10,14,0.55) 35%, transparent 65%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(0deg, #060a0e 0%, transparent 40%)",
          }}
        />
      </div>

      {/* stacked glass cards on the left */}
      <div className="relative z-10 flex flex-col gap-5 p-6 sm:p-10 max-w-[420px]">
        {VENTURES.map((v, i) => (
          <GlassCard key={v.tag} tag={v.tag} title={v.title} index={i} offset={v.offset}>
            {v.desc}
          </GlassCard>
        ))}
      </div>
    </section>
  );
}
