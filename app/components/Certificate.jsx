"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  AnimatePresence,
} from "framer-motion";
import { Bebas_Neue, DM_Mono } from "next/font/google";
import { ArrowUpRight, BadgeCheck } from "lucide-react";

const bebas  = Bebas_Neue({ weight: "400", subsets: ["latin"], display: "swap" });
const dmMono = DM_Mono({ weight: ["300", "400", "500"], subsets: ["latin"], display: "swap" });

const EASE       = [0.22, 1, 0.36, 1];
const EASE_INOUT = [0.87, 0, 0.13, 1];

/* ─────────────────────────────────────────
   DATA — replace with your real certs
───────────────────────────────────────── */
const CERTIFICATIONS = [
  {
    title: "Diploma in Modern Project Management",
    issuer: "Alison",
    year: "2026",
    category: "Project Management",
    credentialLink: "https://alison.com/verify/d2b82b5271",
  },
  {
    title: "CS50’s Introduction to Computer Science",
    issuer: "Harvard University",
    year: "2025",
    category: "Development",
    credentialLink: "https://certificates.cs50.io/cfeaf749-e699-4dbe-8a87-b8a3422651e9.pdf?size=letter",
  },
];

const PM_CERTS  = CERTIFICATIONS.filter((c) => c.category === "Project Management");
const DEV_CERTS = CERTIFICATIONS.filter((c) => c.category === "Development");

/* ─────────────────────────────────────────
   CHAR-BY-CHAR MASK REVEAL
───────────────────────────────────────── */
const MaskReveal = ({ text, delay = 0, className = "" }) => (
  <span className={`inline-flex flex-wrap ${className}`}>
    {text.split("").map((char, i) => (
      <span key={i} className="inline-block overflow-hidden" style={{ paddingBottom: "0.05em" }}>
        <motion.span
          className="inline-block"
          initial={{ y: "110%" }}
          whileInView={{ y: "0%" }}
          viewport={{ once: true }}
          transition={{ duration: 1.0, delay: delay + i * 0.025, ease: EASE }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      </span>
    ))}
  </span>
);

/* ─────────────────────────────────────────
   CERT CARD
───────────────────────────────────────── */
const CertCard = ({ cert, index, isPM }) => {
  const [hovered, setHovered] = useState(false);
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className="relative cursor-pointer"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: index * 0.1, ease: EASE }}
    >
      {/* Hover glow bg */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            className={`absolute inset-0 -mx-3 rounded-sm sm:-mx-5
                        ${isPM ? "bg-lime-400/[0.07]" : "bg-white/[0.04]"}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          />
        )}
      </AnimatePresence>

      <div className="relative flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:gap-0">

        {/* Index number */}
        <div className="shrink-0 sm:w-10">
          <span
            className={`${dmMono.className} text-[10px] uppercase tracking-[0.22em]
                        transition-colors duration-300
                        ${hovered
                          ? isPM ? "text-lime-400" : "text-white/70"
                          : "text-white/40"
                        }`}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Title + issuer */}
        <div className="flex flex-1 flex-col gap-1.5 sm:pl-3">
          <span
            className={`text-sm font-semibold leading-snug transition-colors duration-300
                        sm:text-[15px] lg:text-base
                        ${hovered ? "text-white" : "text-white/90"}`}
          >
            {cert.title}
          </span>
          <span
            className={`${dmMono.className} text-[10px] uppercase tracking-[0.2em]
                        transition-colors duration-300
                        ${hovered
                          ? isPM ? "text-lime-400/90" : "text-white/60"
                          : "text-white/50"
                        }`}
          >
            {cert.issuer}
          </span>
        </div>

        {/* Right side */}
        <div className="flex shrink-0 items-center gap-4 pl-8 sm:gap-5 sm:pl-0">

          {/* Category pill */}
          <span
            className={`${dmMono.className} hidden rounded-sm border px-2.5 py-1
                        text-[9px] uppercase tracking-[0.18em] sm:block
                        transition-all duration-300
                        ${hovered
                          ? isPM
                            ? "border-lime-400/60 bg-lime-400/10 text-lime-400"
                            : "border-white/40 bg-white/[0.06] text-white/80"
                          : isPM
                            ? "border-lime-400/30 bg-lime-400/5 text-lime-400/70"
                            : "border-white/20 bg-white/[0.03] text-white/50"
                        }`}
          >
            {cert.category}
          </span>

          {/* Year */}
          <span
            className={`${dmMono.className} text-[10px] uppercase tracking-[0.22em]
                        transition-colors duration-300
                        ${hovered ? "text-white/70" : "text-white/45"}`}
          >
            {cert.year}
          </span>

          {/* Verified badge */}
          <span
            className={`transition-colors duration-300
                        ${hovered
                          ? isPM ? "text-lime-400" : "text-white/70"
                          : "text-white/30"
                        }`}
          >
            <BadgeCheck size={15} />
          </span>

          {/* Verify link */}
          <motion.a
            href={cert.credentialLink}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-1 transition-colors duration-300
                        ${hovered
                          ? isPM ? "text-lime-400" : "text-white/80"
                          : "text-white/35"
                        }`}
            whileHover={{ x: 2, y: -2 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            <span className={`${dmMono.className} hidden text-[9px] uppercase tracking-[0.2em] lg:block`}>
              Verify
            </span>
            <ArrowUpRight size={13} />
          </motion.a>
        </div>
      </div>

      {/* Bottom rule */}
      <motion.div
        className="relative h-px w-full overflow-hidden"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
      >
        <div className="absolute inset-0 bg-white/10" />
        <motion.div
          className={`absolute inset-y-0 left-0 ${isPM ? "bg-lime-400/60" : "bg-white/30"}`}
          initial={{ width: "0%" }}
          animate={inView ? { width: "100%" } : { width: "0%" }}
          transition={{ duration: 1.2, delay: index * 0.1 + 0.2, ease: EASE_INOUT }}
        />
        <AnimatePresence>
          {hovered && (
            <motion.div
              className={`absolute inset-y-0 left-0 h-full
                          ${isPM ? "bg-lime-400" : "bg-white/60"}`}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: EASE }}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

/* ─────────────────────────────────────────
   COLUMN WRAPPER
───────────────────────────────────────── */
const CertColumn = ({ certs, label, isPM }) => {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="flex flex-col">
      {/* Column header */}
      <motion.div
        className="mb-7 flex items-center gap-3"
        initial={{ opacity: 0, x: -14 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, ease: EASE }}
      >
        <motion.span
          className={`block h-px shrink-0 ${isPM ? "bg-lime-400" : "bg-white/40"}`}
          initial={{ width: 0 }}
          animate={inView ? { width: 24 } : {}}
          transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
        />
        <span
          className={`${dmMono.className} text-[10px] uppercase tracking-[0.3em]
                      ${isPM ? "text-lime-400" : "text-white/60"}`}
        >
          {label}
        </span>
        <div className={`flex-1 h-px ${isPM ? "bg-lime-400/20" : "bg-white/12"}`} />
        <span className={`${dmMono.className} text-[9px] uppercase tracking-[0.22em] text-white/40`}>
          {certs.length} certs
        </span>
      </motion.div>

      {certs.map((cert, i) => (
        <CertCard key={cert.title} cert={cert} index={i} isPM={isPM} />
      ))}
    </div>
  );
};

/* ─────────────────────────────────────────
   MAIN SECTION
───────────────────────────────────────── */
export default function Certifications() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const glow1Y = useSpring(
    useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]),
    { stiffness: 40, damping: 18 }
  );
  const glow2Y = useSpring(
    useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]),
    { stiffness: 40, damping: 18 }
  );

  return (
    <section
      id="certificate"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#080808] py-20 sm:py-28 lg:py-36"
    >
      {/* Parallax glows */}
      <motion.div
        className="pointer-events-none absolute -right-40 top-1/4 h-[550px] w-[550px]
                   rounded-full bg-lime-400/[0.06] blur-[130px]"
        style={{ y: glow1Y }}
      />
      <motion.div
        className="pointer-events-none absolute -left-40 bottom-1/4 h-[450px] w-[450px]
                   rounded-full bg-lime-400/[0.04] blur-[110px]"
        style={{ y: glow2Y }}
      />

      <div className="relative px-5 sm:px-10 lg:px-16">

        {/* ── HEADING ── */}
        <div className="mb-16 sm:mb-20">

          {/* Eyebrow */}
          <motion.div
            className="mb-4 flex items-center gap-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <motion.span
              className="block h-px bg-lime-400"
              initial={{ width: 0 }}
              whileInView={{ width: 36 }}
              viewport={{ once: true }}
              transition={{ duration: 1.0, ease: EASE }}
            />
            <span className={`${dmMono.className} text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-lime-400`}>
              Credentials
            </span>
          </motion.div>

          {/* Title + subtitle */}
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <motion.h2
              className={`${bebas.className} text-[13vw] uppercase leading-[0.88] tracking-wide
                          text-white sm:text-[9vw] lg:text-[7vw]`}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.0, delay: 0.1, ease: EASE }}
            >
              Licenses &<br />
              Certifications<span className="text-lime-400">.</span>
            </motion.h2>
 
            <motion.p
              className="max-w-[260px] text-sm leading-[1.9] text-white/80
                         sm:text-right sm:text-sm lg:max-w-[280px]"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.0, delay: 0.3, ease: EASE }}
            >
              Verified credentials spanning computer science and project management.
            </motion.p>
          </div>

          {/* Animated gradient divider */}
          <div className="relative mt-6 h-px w-full overflow-hidden bg-white/8">
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-lime-400/70 via-white/25 to-transparent"
              initial={{ width: "0%" }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.6, ease: EASE_INOUT }}
            />
          </div>

          {/* Stats row */}
          {/* <motion.div
            className="mt-7 flex flex-wrap gap-8 sm:gap-12"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.4, ease: EASE }}
          >
            {[
              { value: CERTIFICATIONS.length, label: "Total Certs" },
              { value: PM_CERTS.length,        label: "Project Mgmt" },
              { value: DEV_CERTS.length,       label: "Development" },
            ].map((stat, i) => (
              <div key={i} className="flex items-baseline gap-2.5">
                <span className={`${bebas.className} text-4xl text-white sm:text-5xl`}>
                  {stat.value}
                </span>
                <span className={`${dmMono.className} text-[9px] uppercase tracking-[0.22em] text-white/50`}>
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div> */}
        </div>

        {/* ── TWO COLUMNS ── */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
          <CertColumn certs={PM_CERTS}  label="Project Management" isPM={true}  />
          <CertColumn certs={DEV_CERTS} label="Development"        isPM={false} />
        </div>

        {/* ── FOOTER ROW ── */}
        <motion.div
          className="mt-16 flex items-center gap-4 sm:mt-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <span className={`${dmMono.className} text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-white/40`}>
            All credentials verified
          </span>
          <div className="flex-1 h-px bg-white/8" />
          <motion.span
            className="text-lime-400/60"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >◆</motion.span>
        </motion.div>

      </div>
    </section>
  );
}