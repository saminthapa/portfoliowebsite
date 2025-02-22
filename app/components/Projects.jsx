"use client";

import { useEffect } from 'react';
import Image from "next/image";
import { PROJECTS } from "../constants";
import { motion } from "framer-motion";
import AOS from 'aos';
import 'aos/dist/aos.css';

const Projects = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <section className="p-8" id="projects">
      <h2 className="my-10 text-center text-3xl lg:text-8xl" data-aos="fade-up">
        My Projects
      </h2>

      <div className="columns-1 gap-4 md:columns-2 lg:columns-3">
        {PROJECTS.map((project) => (
          <a
            key={project.id}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <motion.div
              className="relative mb-4 overflow-hidden rounded-lg bg-white shadow-lg"
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.3 },
              }}
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <Image
                src={project.imgSrc}
                alt={project.title}
                className="h-auto w-full object-cover"
              />

              <div className="absolute bottom-0 left-0 right-0 m-8 p-8 text-[#003366] backdrop-blur-md">
                <h3 className="text-3xl">{project.title}</h3>
                <p className="max-w-xs">{project.description}</p>
              </div>
            </motion.div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default Projects;
