"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bebas_Neue, DM_Mono } from "next/font/google";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";

const bebas  = Bebas_Neue({ weight: "400", subsets: ["latin"], display: "swap" });
const dmMono = DM_Mono({ weight: ["300", "400", "500"], subsets: ["latin"], display: "swap" });

const EASE = [0.22, 1, 0.36, 1];

const projects = [
  {
    title: "Gym Website",
    description: "Modern, high-performance website for a Muay Thai gym with responsive design and SEO optimization.",
    tech: ["Next.js", "Tailwind CSS", "Animation", "Responsive Design"],
    image: "/project/rhino.png",
    demoLink: "https://rhinomuaythai.com/",
    category: "Web Design",
  },
  {
    title: "Coastal Luxury Hotel",
    description: "Luxury hotel website design featuring cinematic video, parallax scrolling, animated reveals, contact form, suites, spa & gallery sections.",
    tech: ["Animatiom", "Parallax Scrolling", "Vanilla JS", "Responsive Design"],
    image: "/project/lumara.png",
    demoLink: "https://saminthapa.github.io/lumara-hotel/",
    category: "Web Design",
  },
  {
    title: "E-Commerce Website",
    description: "A full-featured e-commerce platform for a clothing brand with pagination and admin panel.",
    tech: ["Next.js", "PostgreSQL", "PrismaORM", "Cloudinary"],
    image: "/project/essence.png",
    demoLink: "https://www.essencenp.com/",
    category: "Full-Stack",
  },
  {
    title: "Artisan Coffee House",
    description: "Brooklyn café website design with cinematic hero, filterable menu, animated counters, immersive video, and luxury dark editorial layout.",
   tech: ["Cinematic", "Vanilla JS", "Responsive Design"],
    image: "/project/noir.png",
    demoLink: "https://saminthapa.github.io/cafesite/",
    category: "Web Design",
  },
  {
    title: "Photo & Videography",
    description: "Creative portfolio for a photo & videography studio with smooth animations and online booking.",
    tech: ["Next.js", "Tailwind CSS", "Framer Motion", "SEO"],
    image: "/project/destiny.png",
    demoLink: "http://destinyfilms.com.np/",
    category: "Web Design",
  },
  {
    title: "Car Rent Website",
    description: "A full-featured Car Rental platform with authentication and API integration.",
    tech: ["Next.js", "GraphQL", "Clerk Auth", "TypeScript"],
    image: "/project/car_rental.png",
    demoLink: "https://car-rental-saminthapa.vercel.app/",
    category: "Full-Stack",
  },
];

/* ─────────────────────────────────────────
   Position offset from center: -1, 0, +1
   Returns transform props per position
───────────────────────────────────────── */
const getCardStyle = (offset) => {
  if (offset === 0) {
    // Center — fully visible, closest
    return {
      x: "0%",
      scale: 1,
      zIndex: 30,
      opacity: 1,
      rotateY: 0,
      filter: "brightness(1)",
    };
  }
  if (Math.abs(offset) === 1) {
    // Adjacent cards — pushed back, dimmed
    return {
      x: offset < 0 ? "-62%" : "62%",
      scale: 0.82,
      zIndex: 20,
      opacity: 0.55,
      rotateY: offset < 0 ? 18 : -18,
      filter: "brightness(0.45)",
    };
  }
  // Hidden cards beyond ±1
  return {
    x: offset < 0 ? "-100%" : "100%",
    scale: 0.65,
    zIndex: 10,
    opacity: 0,
    rotateY: offset < 0 ? 28 : -28,
    filter: "brightness(0.2)",
  };
};

/* ─────────────────────────────────────────
   SINGLE CARD
───────────────────────────────────────── */
const Card = ({ project, offset, index }) => {
  const isCenter = offset === 0;
  const style    = getCardStyle(offset);

  return (
    <motion.div
      className="absolute left-1/2 top-0 w-full -translate-x-1/2"
      style={{
        width: "clamp(260px, 52vw, 580px)",
        perspective: 1000,
        originX: 0.5,
      }}
      animate={{
        x: `calc(-50% + ${style.x === "0%" ? "0px" : style.x})`,
        scale: style.scale,
        zIndex: style.zIndex,
        opacity: style.opacity,
        rotateY: style.rotateY,
        filter: style.filter,
      }}
      transition={{ duration: 0.65, ease: EASE }}
    >
      {/* Shadow card behind side cards */}
      {!isCenter && (
        <div
          className="absolute inset-0 rounded-sm"
          style={{
            boxShadow: offset < 0
              ? "8px 0 40px rgba(0,0,0,0.8)"
              : "-8px 0 40px rgba(0,0,0,0.8)",
            zIndex: -1,
          }}
        />
      )}

      <div className="group overflow-hidden rounded-sm">
        {/* Image */}
        <div className="relative overflow-hidden" style={{ aspectRatio: "16/10" }}>
          <img
            src={project.image}
            alt={project.title}
            className={`h-full w-full object-cover transition-transform duration-700
                        ${isCenter ? "group-hover:scale-105" : ""}`}
            draggable={false}
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/90 via-[#080808]/20 to-transparent" />

          {/* Category pill */}
          <span className={`${dmMono.className} absolute left-4 top-4 rounded-sm border border-white/15
                            bg-[#080808]/70 px-3 py-1 text-[8px] uppercase tracking-[0.25em]
                            text-white/50 backdrop-blur-sm`}>
            {project.category}
          </span>

          {/* Index watermark */}
          <span className={`${bebas.className} absolute right-4 bottom-2 text-[4.5rem]
                            leading-none text-white/[0.06] select-none pointer-events-none`}>
            {String(index + 1).padStart(2, "0")}
          </span>

          {/* Center card hover overlay */}
          {isCenter && (
            <div className="absolute inset-0 flex items-center justify-center
                            bg-[#080808]/60 opacity-0 backdrop-blur-[2px]
                            transition-all duration-500 group-hover:opacity-100">
              <motion.a
                href={project.demoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full border border-lime-400/60
                           bg-lime-400/10 px-6 py-3 text-white
                           transition-colors duration-300 hover:bg-lime-400 hover:text-black"
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.96 }}
              >
                <span className={`${dmMono.className} text-[11px] uppercase tracking-[0.22em]`}>
                  View Live
                </span>
                <ArrowUpRight size={13} />
              </motion.a>
            </div>
          )}
        </div>

        {/* Card info — only fully visible on center */}
        <motion.div
          className="bg-[#0e0e0e] px-5 py-4 sm:px-6 sm:py-5"
          animate={{ opacity: isCenter ? 1 : 0, y: isCenter ? 0 : 8 }}
          transition={{ duration: 0.4, ease: EASE }}
        >
          <h3 className={`${bebas.className} mb-1.5 text-3xl uppercase leading-none
                          tracking-wide text-white sm:text-4xl`}>
            {project.title}
          </h3>
          <p className="mb-3 text-[11px] leading-[1.8] text-white/40 sm:text-xs">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className={`${dmMono.className} rounded-sm border border-lime-400/20
                            bg-lime-400/5 px-2 py-0.5 text-[8px] uppercase
                            tracking-[0.18em] text-lime-400/60`}
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Mobile demo link */}
          <a
            href={project.demoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 flex w-fit items-center gap-1.5 sm:hidden"
          >
            <span className={`${dmMono.className} text-[9px] uppercase tracking-[0.22em] text-lime-400`}>
              View Live
            </span>
            <ArrowUpRight size={11} className="text-lime-400" />
          </a>
        </motion.div>
      </div>
    </motion.div>
  );
};

/* ─────────────────────────────────────────
   MAIN SECTION
───────────────────────────────────────── */
const MyProjects = () => {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => Math.max(0, c - 1));
  const next = () => setCurrent((c) => Math.min(projects.length - 1, c + 1));

  // Approx card height for the container (image + info)
  const CONTAINER_H = "clamp(360px, 60vw, 660px)";

  return (
    <section
      id="projects"
      className="relative w-full overflow-hidden bg-[#080808] py-20 sm:py-28"
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[700px] w-[900px]
                      -translate-x-1/2 -translate-y-1/2 rounded-full
                      bg-lime-400/[0.04] blur-[150px]" />

      {/* ── HEADING ── */}
      <div className="mb-14 px-5 sm:px-10 lg:px-16">
        <motion.div
          className="mb-3 flex items-center gap-3"
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
          <span className={`${dmMono.className} text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-lime-400`}>
            Featured Work
          </span>
        </motion.div>

        <div className="flex items-end justify-between">
          <motion.h2
            className={`${bebas.className} text-[13vw] uppercase leading-none tracking-wide
                        text-white sm:text-[9vw] lg:text-[7vw]`}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.0, delay: 0.1, ease: EASE }}
          >
            Projects<span className="text-lime-400">.</span>
          </motion.h2>

          {/* Counter */}
          <motion.span
            className={`${dmMono.className} text-[10px] uppercase tracking-[0.28em] text-white/25`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {String(current + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
          </motion.span>
        </div>

        <motion.div
          className="mt-4 h-px w-full origin-left bg-white/8"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: [0.87, 0, 0.13, 1] }}
        />
      </div>

      {/* ── CAROUSEL ── */}
      <div className="relative flex items-center justify-center px-2 sm:px-0">

        {/* LEFT ARROW */}
        <button
          onClick={prev}
          disabled={current === 0}
          className="absolute left-2 top-[30%] z-40 flex h-10 w-10 -translate-y-1/2 items-center
                     justify-center rounded-full border border-white/15 bg-[#080808]/80
                     text-white/50 backdrop-blur-sm transition-all duration-300
                     hover:border-lime-400/60 hover:text-lime-400
                     disabled:opacity-20 disabled:cursor-not-allowed
                     sm:left-6 sm:h-12 sm:w-12 lg:left-10"
        >
          <ArrowLeft size={16} />
        </button>

        {/* CARDS STAGE */}
        <div
          className="relative w-full overflow-visible"
          style={{ height: CONTAINER_H, perspective: "1200px" }}
        >
          {projects.map((project, i) => {
            const offset = i - current;
            // Only render center ± 1
            if (Math.abs(offset) > 1) return null;
            return (
              <Card
                key={project.title}
                project={project}
                index={i}
                offset={offset}
              />
            );
          })}
        </div>

        {/* RIGHT ARROW */}
        <button
          onClick={next}
          disabled={current === projects.length - 1}
          className="absolute right-2 top-[30%] z-40 flex h-10 w-10 -translate-y-1/2 items-center
                     justify-center rounded-full border border-white/15 bg-[#080808]/80
                     text-white/50 backdrop-blur-sm transition-all duration-300
                     hover:border-lime-400/60 hover:text-lime-400
                     disabled:opacity-20 disabled:cursor-not-allowed
                     sm:right-6 sm:h-12 sm:w-12 lg:right-10"
        >
          <ArrowRight size={16} />
        </button>
      </div>

      {/* ── DOT INDICATORS ── */}
      <div className="mt-10 flex items-center justify-center gap-2">
        {projects.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className="relative h-[3px] overflow-hidden rounded-full transition-all duration-300"
            style={{ width: i === current ? 28 : 12 }}
          >
            <div className="absolute inset-0 bg-white/15" />
            {i === current && (
              <motion.div
                className="absolute inset-0 bg-lime-400"
                layoutId="activeDot"
                transition={{ type: "spring", stiffness: 300, damping: 28 }}
              />
            )}
          </button>
        ))}
      </div>
    </section>
  );
};

export default MyProjects;