"use client"
import { LuImport } from "react-icons/lu";
import { motion } from "framer-motion";
import samin from "../assets/samin.jpg";
import Image from "next/image";

function Hero() {
  return (
    <section>
      <div className="flex flex-col items-center justify-center">
        <motion.h1
          className="mt-16 overflow-hidden text-[12vw] font-semibold uppercase leading-none"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="text-black bg-lime-400">Samin</span> <br /> Thapa Kshetri
        </motion.h1>
        <motion.div
          className="mt-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <a
            href="/samin_thapa_f.pdf"
            target="_blank"
            rel="noopener noreferrer"
            download
            className="flex items-center rounded-xl bg-lime-300 p-2 px-3 font-sans font-medium text-black hover:bg-lime-400"
          >
            <span>Resume.pdf</span>
            <LuImport className="ml-2" />
          </a>
        </motion.div>

        <motion.div
          className="w-full"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <Image src={samin} alt="Samin Thapa" className="mt-8 h-96 w-full object-cover" />
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
