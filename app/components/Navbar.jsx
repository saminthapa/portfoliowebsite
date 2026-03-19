"use client"

import { useState, useEffect, useRef } from "react"
import { FaBars, FaTimes } from "react-icons/fa"
import { LINKS } from "../constants"
import { AnimatePresence, motion } from "framer-motion"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef(null)

  const toggleMenu = () => setIsOpen(!isOpen)

  useEffect(() => {
    document.documentElement.style.overflow = isOpen ? "hidden" : "auto"
  }, [isOpen])

  const overlayVariants = {
    hidden: {
      clipPath: "circle(0% at calc(100% - 2.5rem) 2.5rem)",
      opacity: 1,
      transition: {
        duration: 1.0,
        ease: [0.87, 0, 0.13, 1],
        when: "afterChildren",
        staggerChildren: 0.06,
        staggerDirection: -1,
      },
    },
    visible: {
      clipPath: "circle(150% at calc(100% - 2.5rem) 2.5rem)",
      opacity: 1,
      transition: {
        duration: 1.1,
        ease: [0.87, 0, 0.13, 1],
        staggerChildren: 0.1,
        delayChildren: 0.45,
      },
    },
  }

  const linkVariants = {
    hidden: {
      opacity: 0,
      y: 80,
      skewY: 6,
      transition: { duration: 0.5, ease: [0.87, 0, 0.13, 1] },
    },
    visible: {
      opacity: 1,
      y: 0,
      skewY: 0,
      transition: { duration: 0.75, ease: [0.87, 0, 0.13, 1] },
    },
  }

  const footerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: 0.9 },
    },
  }

  return (
    <>
      <nav className="fixed right-0 top-0 z-50 p-4">
        <motion.button
          onClick={toggleMenu}
          className="relative flex h-11 w-11 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white shadow-lg"
          whileHover={{ scale: 1.1, backgroundColor: "rgba(163,230,53,0.15)" }}
          whileTap={{ scale: 0.92 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          <AnimatePresence mode="wait" initial={false}>
            {isOpen ? (
              <motion.span
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.87, 0, 0.13, 1] }}
              >
                <FaTimes className="h-5 w-5" />
              </motion.span>
            ) : (
              <motion.span
                key="open"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.87, 0, 0.13, 1] }}
              >
                <FaBars className="h-5 w-5" />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={menuRef}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={overlayVariants}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-black text-white overflow-hidden"
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-5"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(163,230,53,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(163,230,53,0.5) 1px, transparent 1px)",
                backgroundSize: "60px 60px",
              }}
            />

            <motion.div
              className="pointer-events-none absolute -top-40 -right-40 h-96 w-96 rounded-full bg-lime-300/10 blur-3xl"
              animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />

            <ul className="relative z-10 flex flex-col items-start gap-2 px-12">
              {LINKS.map((link, i) => (
                <motion.li
                  key={link.id}
                  variants={linkVariants}
                  className="group overflow-hidden"
                >
                  <div className="relative">
                    <motion.span
                      className="absolute -left-8 top-1/2 -translate-y-1/2 text-xs text-lime-300/60 font-mono"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 + i * 0.08 }}
                    >
                      0{i + 1}
                    </motion.span>

                    <a
                      href={`#${link.id}`}
                      onClick={toggleMenu}
                      className="block text-5xl font-semibold uppercase tracking-tight text-white transition-colors duration-200 hover:text-lime-300 lg:text-9xl"
                    >
                      {link.name}
                    </a>

                    <span className="block h-px w-0 bg-lime-300 transition-all duration-300 group-hover:w-full" />
                  </div>
                </motion.li>
              ))}
            </ul>

            <motion.p
              variants={footerVariants}
              className="absolute bottom-8 left-8 text-xs tracking-widest uppercase text-white/30 font-mono"
            >
              Portfolio {new Date().getFullYear()}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar