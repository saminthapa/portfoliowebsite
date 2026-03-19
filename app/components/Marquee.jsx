"use client"

import { motion } from "framer-motion"
import { Bebas_Neue, DM_Mono } from "next/font/google"

const bebas = Bebas_Neue({ weight: "400", subsets: ["latin"], display: "swap" })
const dmMono = DM_Mono({ weight: ["300", "400"], subsets: ["latin"], display: "swap" })

const FULLSTACK_SKILLS = [
  "React", "Next.js", "TypeScript", "Node.js", "Tailwind CSS",
  "PostgreSQL", "MongoDB", "REST API", "Git", "Figma",
]

const PM_SKILLS = [
  "Agile", "Scrum", "Jira", "Product Roadmap", "Sprint Planning",
  "Stakeholder Management", "Risk Assessment", "Kanban", "Confluence", "OKRs",
]

const MarqueeRow = ({ items, direction = 1, speed = 28, variant = "filled" }) => {
  const rowItems = [...items, ...items, ...items, ...items]
  const isFilled = variant === "filled"

  return (
    <div className="relative">
      <div
        className="flex overflow-hidden whitespace-nowrap"
        style={{ maskImage: "linear-gradient(90deg, transparent, black 12%, black 88%, transparent)" }}
      >
        <motion.div
          className="flex shrink-0 items-center"
          animate={{ x: direction === 1 ? ["-50%", "0%"] : ["0%", "-50%"] }}
          transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
          style={{ willChange: "transform" }}
        >
          {rowItems.map((item, i) => (
            <span key={i} className="inline-flex items-center">
              <span className={`${bebas.className} px-4 sm:px-6
                                text-3xl sm:text-4xl lg:text-5xl xl:text-6xl
                                uppercase tracking-wide leading-none
                                ${isFilled ? "text-black/80" : "text-lime-400/70"}`}>
                {item}
              </span>
              <span className={`text-base ${isFilled ? "text-black/30" : "text-lime-400/25"}`}>◆</span>
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

export default function Marquee() {
  return (
    <section className="relative w-full overflow-hidden bg-[#080808]">

      <motion.div className="h-px w-full bg-white/8"
        initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
        transition={{ duration: 1.4, ease: [0.87, 0, 0.13, 1] }} />

      {/* ROW 1 — Full-Stack */}
      <div className="relative bg-lime-400">
        {/* Label pill — sits above the marquee, outside the overflow */}
        <div className="absolute -top-3 left-5 z-20 sm:left-10 lg:left-16">
          <span className={`${dmMono.className} inline-block rounded-sm bg-black px-3 py-1
                            text-[8px] sm:text-[9px] uppercase tracking-[0.28em] text-lime-400`}>
            Full-Stack
          </span>
        </div>
        <div className="py-3 sm:py-4 lg:py-5">
          <MarqueeRow items={FULLSTACK_SKILLS} direction={1} speed={32} variant="filled" />
        </div>
      </div>

      {/* DIVIDER */}
      <div className="flex items-center bg-[#0b0b0b] px-5 py-2 sm:px-10 lg:px-16">
        <div className="flex-1 h-px bg-white/6" />
        <span className={`${dmMono.className} mx-4 text-[9px] uppercase tracking-[0.32em] text-white/400`}>
          Skills &amp; Technologies
        </span>
        <div className="flex-1 h-px bg-white/6" />
      </div>

      {/* ROW 2 — Project Manager */}
      <div className="relative bg-[#0e0e0e]">
        {/* Label pill */}
        <div className="absolute -top-3 left-5 z-20 sm:left-10 lg:left-16">
          <span className={`${dmMono.className} inline-block rounded-sm border border-lime-400/40
                            bg-[#080808] px-3 py-1 text-[8px] sm:text-[9px] uppercase
                            tracking-[0.28em] text-lime-400`}>
            Project Management
          </span>
        </div>
        <div className="py-3 sm:py-4 lg:py-5">
          <MarqueeRow items={PM_SKILLS} direction={-1} speed={32} variant="outline" />
        </div>
      </div>

      <motion.div className="h-px w-full bg-white/8"
        initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
        transition={{ duration: 1.4, ease: [0.87, 0, 0.13, 1] }} />

    </section>
  )
}