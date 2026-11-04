import React from "react";
import { motion } from "framer-motion";

/**
 * Frosted glassmorphic card with staggered entrance and a
 * spring-based hover lift + glow border.
 *
 * Props:
 *  - tag: small pill label, e.g. "FEATURE 1" or "VENTURE 01"
 *  - title: bold header text
 *  - children: body copy
 *  - index: position in the stack, drives stagger delay
 *  - offset: optional Tailwind margin class for horizontal stagger
 */
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25,
      delay: i * 0.12,
    },
  }),
};

export default function GlassCard({ tag, title, children, index = 0, offset = "" }) {
  return (
    <motion.div
      className={`relative group ${offset}`}
      custom={index}
      initial="hidden"
      animate="visible"
      variants={cardVariants}
      whileHover={{
        y: -4,
        scale: 1.02,
        transition: { type: "spring", stiffness: 400, damping: 25 },
      }}
    >
      {/* glow ring, fades in on hover */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0
                   group-hover:opacity-100 transition-opacity duration-300
                   shadow-glow-accent"
      />

      <div
        className="relative rounded-2xl border border-white/10 bg-white/[0.06]
                   backdrop-blur-md shadow-glass-inner
                   px-6 py-5 sm:px-7 sm:py-6
                   transition-colors duration-300 group-hover:border-white/20"
      >
        <span
          className="inline-flex items-center gap-1.5 rounded-full
                     border border-accent-400/30 bg-accent-400/10
                     px-3 py-1 text-[11px] font-semibold tracking-[0.15em]
                     text-accent-400 uppercase"
        >
          {tag}
        </span>

        <h3 className="mt-3 text-lg sm:text-xl font-bold text-white leading-snug">
          {title}
        </h3>

        <p className="mt-2 text-sm text-slate-300/90 leading-relaxed">
          {children}
        </p>
      </div>
    </motion.div>
  );
}
