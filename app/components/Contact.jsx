"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { Bebas_Neue, DM_Mono } from "next/font/google";
import { CONTACT, SOCIAL_MEDIA_LINKS } from "../constants";
import { ArrowUpRight, Mail } from "lucide-react";

const bebas  = Bebas_Neue({ weight: "400", subsets: ["latin"], display: "swap" });
const dmMono = DM_Mono({ weight: ["300", "400", "500"], subsets: ["latin"], display: "swap" });

const EASE       = [0.22, 1, 0.36, 1];
const EASE_INOUT = [0.87, 0, 0.13, 1];
const SPRING     = { type: "spring", stiffness: 280, damping: 24, mass: 0.6 };

/* ─────────────────────────────────────────
   SEO — JSON-LD structured data
   Helps Google understand this is a
   contact page for a real person
───────────────────────────────────────── */
const StructuredData = () => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Samin Thapa Kshetry",
        jobTitle: "Full-Stack Developer & Project Manager",
        url: "https://saminthapakshetry.com.np",
        email: CONTACT.email,
        telephone: CONTACT.phone,
        address: {
          "@type": "PostalAddress",
          addressCountry: "NP",
          addressLocality: "Nepal",
        },
        sameAs: SOCIAL_MEDIA_LINKS.map((l) => l.href).filter((h) => h !== "#"),
      }),
    }}
  />
);

/* ─────────────────────────────────────────
   INFINITE MARQUEE CTA — scrolls "Let's
   work together" repeatedly
───────────────────────────────────────── */
const MarqueeCTA = () => {
  const items = Array(8).fill("Let's Work Together ◆");
  return (
    <div
      className="w-full overflow-hidden border-y border-white/8 py-4 sm:py-5"
      aria-hidden="true"
    >
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      >
        {[...items, ...items].map((text, i) => (
          <span
            key={i}
            className={`${bebas.className} mx-6 text-2xl uppercase tracking-widest
                        text-white/20 sm:text-3xl lg:text-4xl`}
          >
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

/* ─────────────────────────────────────────
   CONTACT LINK ROW
───────────────────────────────────────── */
const ContactLink = ({ href, icon, label, sublabel, delay, ariaLabel }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.a
      href={href}
      aria-label={ariaLabel}
      className="group relative flex items-center justify-between gap-4 py-6 sm:py-7"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1.0, delay, ease: EASE }}
    >
      {/* Hover bg */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            className="absolute inset-0 -mx-5 rounded-sm bg-lime-400/[0.06] sm:-mx-10 lg:-mx-16"
            initial={{ opacity: 0, scaleX: 0.97 }}
            animate={{ opacity: 1, scaleX: 1 }}
            exit={{ opacity: 0, scaleX: 0.97 }}
            transition={{ duration: 0.3, ease: EASE }}
          />
        )}
      </AnimatePresence>

      {/* Left */}
      <div className="relative flex items-center gap-4 sm:gap-6">
        {/* Icon circle */}
        <motion.span
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full
                     border border-white/15 text-white/40 sm:h-11 sm:w-11"
          animate={{
            borderColor: hovered ? "rgba(163,230,53,0.6)" : "rgba(255,255,255,0.15)",
            color: hovered ? "rgba(163,230,53,1)" : "rgba(255,255,255,0.4)",
            rotate: hovered ? 12 : 0,
          }}
          transition={SPRING}
        >
          {icon}
        </motion.span>

        {/* Label stack */}
        <div className="flex flex-col gap-0.5">
          <motion.span
            className={`${bebas.className} text-[6vw] uppercase leading-none tracking-wide
                        text-white sm:text-4xl lg:text-5xl xl:text-6xl`}
            animate={{ x: hovered ? 8 : 0, color: hovered ? "rgb(163,230,53)" : "rgb(255,255,255)" }}
            transition={SPRING}
          >
            {label}
          </motion.span>
          <span className={`${dmMono.className} text-[9px] uppercase tracking-[0.22em] text-white/35`}>
            {sublabel}
          </span>
        </div>
      </div>

      {/* Right — animated arrow */}
      <motion.span
        className="relative shrink-0"
        animate={{
          x: hovered ? 5 : 0,
          y: hovered ? -5 : 0,
          color: hovered ? "rgb(163,230,53)" : "rgba(255,255,255,0.25)",
        }}
        transition={SPRING}
      >
        <ArrowUpRight size={22} />
      </motion.span>

      {/* Bottom line — sweeps on hover */}
      <div className="absolute bottom-0 left-0 right-0 h-px overflow-hidden bg-white/8">
        <AnimatePresence>
          {hovered && (
            <motion.div
              className="absolute inset-y-0 left-0 h-full bg-lime-400/70"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              exit={{ width: "0%", transition: { duration: 0.25 } }}
              transition={{ duration: 0.5, ease: EASE }}
            />
          )}
        </AnimatePresence>
      </div>
    </motion.a>
  );
};

/* ─────────────────────────────────────────
   SOCIAL ICON
───────────────────────────────────────── */
const SocialIcon = ({ link, index }) => (
  <motion.a
    href={link.href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={`Visit ${link.href}`}
    className="flex h-10 w-10 items-center justify-center rounded-full
               border border-white/15 text-white/45"
    initial={{ opacity: 0, y: 14, scale: 0.9 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7, delay: 0.5 + index * 0.07, ease: EASE , SPRING}}
    whileHover={{
      scale: 1.15,
      y: -3,
      borderColor: "rgba(163,230,53,0.6)",
      color: "rgb(163,230,53)",
      backgroundColor: "rgba(163,230,53,0.05)",
    }}
    whileTap={{ scale: 0.92 }}
  >
    {link.icon}
  </motion.a>
);

/* ─────────────────────────────────────────
   MAIN
───────────────────────────────────────── */
const Contact = () => {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  /* Parallax glows */
  const glow1Y = useSpring(
    useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]),
    { stiffness: 38, damping: 16 }
  );
  const glow2Y = useSpring(
    useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]),
    { stiffness: 38, damping: 16 }
  );

  /* Heading parallax */
  const headingY = useSpring(
    useTransform(scrollYProgress, [0, 0.5], ["30px", "0px"]),
    { stiffness: 60, damping: 20 }
  );

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#080808]"
      /* SEO: semantic landmark + microdata */
      aria-label="Contact Samin Thapa Kshetry"
      itemScope
      itemType="https://schema.org/ContactPage"
    >
      {/* JSON-LD structured data */}
      <StructuredData />

      {/* ── GLOWS ── */}
      <motion.div
        className="pointer-events-none absolute -top-40 left-1/4 h-[600px] w-[600px]
                   rounded-full bg-lime-400/[0.07] blur-[140px]"
        style={{ y: glow1Y }}
      />
      <motion.div
        className="pointer-events-none absolute -bottom-40 right-1/4 h-[500px] w-[500px]
                   rounded-full bg-lime-400/[0.04] blur-[120px]"
        style={{ y: glow2Y }}
      />

      {/* ── TOP RULE ── */}
      <div className="relative h-px w-full overflow-hidden bg-white/6">
        <motion.div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-lime-400/60 via-white/20 to-transparent"
          initial={{ width: "0%" }}
          whileInView={{ width: "100%" }}
          viewport={{ once: true }}
          transition={{ duration: 1.8, ease: EASE_INOUT }}
        />
      </div>

      <div className="relative flex min-h-screen flex-col px-5 pt-16 pb-10
                      sm:px-10 sm:pt-24 lg:px-16">

        {/* ── EYEBROW ── */}
        <motion.div
          className="mb-7 flex items-center gap-3"
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <motion.span
            className="block h-px bg-lime-400"
            initial={{ width: 0 }}
            whileInView={{ width: 36 }}
            viewport={{ once: true }}
            transition={{ duration: 1.0, delay: 0.1, ease: EASE }}
          />
          <span className={`${dmMono.className} text-[10px] sm:text-[11px] uppercase tracking-[0.32em] text-lime-400`}>
            Get in Touch
          </span>
        </motion.div>

        {/* ── HEADING ── */}
        <motion.div className="mb-4" style={{ y: headingY }}>
          <motion.h2
            className={`${bebas.className} text-[16vw] uppercase leading-[0.85] tracking-wide
                        text-white sm:text-[13vw] lg:text-[11vw]`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, delay: 0.1, ease: EASE }}
          >
            Excited to
          </motion.h2>

          {/* "Collaborate?" — split color with staggered word reveal */}
          <div className="overflow-hidden">
            <motion.div
              className={`${bebas.className} flex flex-wrap items-baseline gap-x-1
                          text-[16vw] uppercase leading-[0.85] tracking-wide
                          sm:text-[13vw] lg:text-[11vw]`}
              initial={{ y: "100%" }}
              whileInView={{ y: "0%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, delay: 0.22, ease: EASE }}
            >
              <span className="text-white">Colla</span>
              <span className="text-lime-400">borate</span>
              <span className="text-white">?</span>
            </motion.div>
          </div>
        </motion.div>

        {/* ── SUBTEXT ── */}
        <motion.p
          className="mb-10 max-w-md text-sm leading-[1.9] text-white/60
                     sm:text-base lg:mb-14 lg:max-w-lg"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0, delay: 0.38, ease: EASE }}
          itemProp="description"
        >
          {CONTACT.text}
        </motion.p>

        {/* ── MARQUEE CTA ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mb-2"
        >
          <MarqueeCTA />
        </motion.div>

        {/* ── CONTACT LINKS ── */}
        <div className="w-full">
          <motion.div
            className="h-px w-full origin-left bg-white/8"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.3, ease: EASE_INOUT }}
          />

          <ContactLink
            href={`mailto:${CONTACT.email}`}
            ariaLabel={`Send email to ${CONTACT.email}`}
            icon={<Mail size={16} />}
            label={CONTACT.email}
            sublabel="Email — Available 24/7"
            delay={0.15}
          />

          <ContactLink
            href={`https://wa.me/${CONTACT.phone.replace(/[^0-9]/g, "")}`}
            ariaLabel={`Message on WhatsApp ${CONTACT.phone}`}
            icon={
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            }
            label={CONTACT.phone}
            sublabel="WhatsApp — Available on chat"
            delay={0.27}
          />
        </div>

        {/* ── FOOTER ── */}
        <footer className="mt-auto pt-16 sm:pt-20" role="contentinfo">

          {/* Divider with lime sweep */}
          <div className="relative mb-8 h-px w-full overflow-hidden bg-white/6">
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-transparent via-lime-400/40 to-transparent"
              initial={{ x: "-100%" }}
              whileInView={{ x: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.6, ease: EASE_INOUT }}
            />
          </div>

          <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">

            {/* Left — social + location */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2.5">
                {SOCIAL_MEDIA_LINKS.map((link, i) => (
                  <SocialIcon key={i} link={link} index={i} />
                ))}
              </div>
              <motion.div
                className="flex items-center gap-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-lime-400 animate-pulse" />
                <span className={`${dmMono.className} text-[9px] uppercase tracking-[0.28em] text-white/35`}>
                  Based in Nepal &nbsp;·&nbsp; Open to connect
                </span>
              </motion.div>
            </div>

            {/* Right — name + copyright */}
            <div className="flex flex-col gap-1 sm:items-end">
              <motion.p
                className={`${bebas.className} text-2xl uppercase tracking-wide text-white/85 sm:text-3xl`}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
                itemProp="name"
              >
                Samin Thapa Kshetry
              </motion.p>
              <motion.p
                className={`${dmMono.className} text-[9px] uppercase tracking-[0.28em] text-white/35`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.42 }}
              >
                &copy; {new Date().getFullYear()} &nbsp;·&nbsp; All rights reserved
              </motion.p>
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
};

export default Contact;