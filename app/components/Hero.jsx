"use client";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import samin from "../assets/samin.jpg";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";

// Cinematic word-by-word mask reveal
const MaskReveal = ({ text, delay = 0, className = "", stagger = 0.08 }) => {
  const words = text.split(" ");
  return (
    <span className={`inline-flex flex-wrap gap-x-[0.25em] ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="overflow-hidden inline-block">
          <motion.span
            className="inline-block"
            initial={{ y: "105%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{
              duration: 1.0,
              delay: delay + i * stagger,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
};

// Animated counter
const Counter = ({ from = 0, to, duration = 2, delay = 0, suffix = "" }) => {
  const [count, setCount] = useState(from);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = null;
    const step = (timestamp) => {
      if (!start) start = timestamp + delay * 1000;
      if (timestamp < start) { requestAnimationFrame(step); return; }
      const progress = Math.min((timestamp - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * (to - from) + from));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, to, from, duration, delay]);

  return <span ref={ref}>{count}{suffix}</span>;
};

function Hero() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const rawY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const imageY = useSpring(rawY, { stiffness: 60, damping: 20 });
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.6], [0.35, 0.75]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden bg-[#080808]"
    >
      {/* BACKGROUND IMAGE with parallax */}
      <motion.div
        ref={imageRef}
        className="absolute inset-0 z-0 w-full h-full"
        style={{ y: imageY }}
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.0, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image
          src={samin}
          alt="Samin Thapa Kshetry"
          fill
          className="object-cover object-center"
          priority
        />
      </motion.div>

      {/* GRADIENT OVERLAYS */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#080808] via-[#080808]/70 to-transparent" />
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#080808]/60 via-transparent to-transparent" />
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#080808]/80 via-transparent to-transparent" />
      <motion.div
        className="absolute inset-0 z-10 bg-[#080808]"
        style={{ opacity: overlayOpacity }}
      />

      {/* LIME GLOW */}
      <motion.div
        className="pointer-events-none absolute bottom-0 left-1/2 z-10 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-lime-400/10 blur-[120px]"
        animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.05, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* SCAN LINE */}
      <motion.div
        className="pointer-events-none absolute left-0 right-0 z-20 h-px bg-lime-400/20"
        initial={{ top: "0%", opacity: 0 }}
        animate={{ top: ["0%", "100%"], opacity: [0, 1, 0] }}
        transition={{ duration: 3.5, delay: 0.5, ease: "linear" }}
      />

      {/* CONTENT */}
      <motion.div
        className="relative z-30 flex min-h-screen flex-col justify-end px-6 pb-12 lg:px-16 lg:pb-16"
        style={{ y: textY }}
      >
        {/* Top-left badge */}
        <motion.div
          className="absolute top-8 left-6 lg:left-16 flex items-center gap-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 1.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="h-2 w-2 rounded-full bg-lime-400 animate-pulse" />
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/50">
            Available for work
          </span>
        </motion.div>

        {/* Top-right year */}
        <motion.div
          className="absolute top-8 right-6 lg:right-16 font-mono text-[10px] uppercase tracking-[0.3em] text-white/30"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 1.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {new Date().getFullYear()}
        </motion.div>

        {/* MAIN HEADING */}
        <div className="mb-6">
          {/* Eyebrow line */}
          <motion.div
            className="mb-4 flex items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.div
              className="h-px bg-lime-400"
              initial={{ width: 0 }}
              animate={{ width: 40 }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            />
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-lime-400">
              Full-Stack Developer | Project Manager Enthusiast
            </span>
          </motion.div>

          {/* Name */}
          <h1 className="text-[17vw] font-black uppercase leading-[0.85] tracking-tighter text-white lg:text-[14vw]">
            <div>
              <MaskReveal text="Samin" delay={0.5} />
            </div>
            <div>
              <MaskReveal text="Thapa" delay={0.65} />
            </div>
            <div>
              <MaskReveal text="Kshetry" delay={0.8} />
            </div>
          </h1>
        </div>

        {/* BOTTOM ROW */}
        <motion.div
          className="flex flex-col gap-6 border-t border-white/10 pt-6 lg:flex-row lg:items-end lg:justify-between"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Role description */}
          <p className="max-w-xs text-sm leading-relaxed text-white/50 lg:text-base">
            Crafting digital experiences at the intersection of design and
            engineering.{" "}
            <span className="text-lime-400">Based in Nepal.</span>
          </p>

          {/* Stats */}
          <div className="flex gap-10">
            {[
              { value: 3, suffix: "+", label: "Years exp." },
              { value: 15, suffix: "+", label: "Projects" },
              { value: 100, suffix: "%", label: "Passion" },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-start">
                <span className="text-2xl font-bold text-white lg:text-3xl">
                  <Counter
                    to={stat.value}
                    suffix={stat.suffix}
                    delay={1.6 + i * 0.15}
                    duration={1.5}
                  />
                </span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-white/30">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          {/* Scroll cue */}
          <div className="flex flex-col items-center gap-2">
            <motion.div
              className="flex h-10 w-6 items-start justify-center rounded-full border border-white/20 p-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.0 }}
            >
              <motion.div
                className="h-2 w-1 rounded-full bg-lime-400"
                animate={{ y: [0, 14, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
            <span className="font-mono text-[9px] uppercase tracking-widest text-white/20">
              Scroll
            </span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Hero;