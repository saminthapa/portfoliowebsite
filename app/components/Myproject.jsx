'use client';

import { useEffect } from "react";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import { Eye } from "lucide-react";

const projects = [
    {
      title: "Gym Website",
      description: "Modern, high-performance website for a Muay Thai gym with responsive design and SEO optimization.",
      tech: ["Next.js", "Tailwind CSS", "Responsive Design"],
      image: "/project/rhino.png",
      demoLink: "https://rhinomuaythai.com/",
      codeLink: null, // You can remove the codeLink display logic if null
    },
    {
      title: "Photo & Videography Website",
      description: "Creative portfolio website for a photo & videography studio with smooth animations and online booking.",
      tech: ["Next.js", "Tailwind CSS", "Framer Motion", "SEO"],
      image: "/project/destiny.png",
      demoLink: "http://destinyfilms.com.np/",
      codeLink: null,
    },
    {
      title: "E-Commerce Website",
      description: "A full-featured e-commerce platform for a clothing brand with pagination and admin panel.",
      tech: ["Next.js", "Postgresql", "PrismaORM", "Cloudinary"],
      image: "/project/essence.png",
      demoLink: "https://www.essencenp.com/",
      codeLink: null,
    },
  ];
  

const MyProjects = () => {
  useEffect(() => {
    AOS.init({ once: true, duration: 800 });
  }, []);

  return (
    <section id="projects" className="py-24 relative overflow-hidden scroll-smooth">
     {/* Background Effects in all 4 corners */}
<div className="absolute top-0 left-0 -ml-40 -mt-40 w-96 h-96 bg-lime-400/10 rounded-full blur-3xl pointer-events-none z-0" />
<div className="absolute top-0 right-0 -mr-40 -mt-40 w-96 h-96 bg-lime-400/10 rounded-full blur-3xl pointer-events-none z-0" />
<div className="absolute bottom-0 left-0 -ml-40 -mb-40 w-96 h-96 bg-lime-400/10 rounded-full blur-3xl pointer-events-none z-0" />
<div className="absolute bottom-0 right-0 -mr-40 -mb-40 w-96 h-96 bg-lime-400/10 rounded-full blur-3xl pointer-events-none z-0" />


      <div className="container mx-auto px-4 relative z-10">
        {/* Title */}
        <motion.div
          className="max-w-xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 mb-4">
            Featured Projects
          </h2>
          <p className="text-gray-300 text-lg">
            Explore my latest work and technical capabilities through these projects
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid gap-8 lg:grid-cols-3 sm:grid-cols-1">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              className="rounded-lg bg-navy/50 backdrop-blur-sm border border-white/10 hover:border-lime-400/40 transition-all duration-500 overflow-hidden shadow-lg group"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              data-aos="fade-up"
            >
              {/* Image with hover effect */}
              <div className="relative">
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>

                {/* Overlay buttons (Demo only) */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy/90 to-transparent opacity-0 sm:group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-6">
                  <div className="hidden sm:flex gap-2">
                    <a
                      href={project.demoLink}
                      target="_blank"
                      className="px-3 py-1 bg-lime-400/20 text-white border border-lime-400/40 text-sm rounded-md hover:bg-lime-400/40 flex items-center gap-1"
                    >
                      <Eye size={14} />
                      Demo
                    </a>
                  </div>
                </div>
              </div>

              {/* Content + Always visible demo on small devices */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-lime-400 transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-sm text-gray-300 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-lime-400/10 border border-lime-400/20 text-lime-400 rounded-md text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                {/* Always visible demo button for mobile */}
                <div className="block sm:hidden">
                  <a
                    href={project.demoLink}
                    target="_blank"
                    className="px-3 py-2 bg-lime-400/20 text-white border border-lime-400/40 text-sm rounded-md hover:bg-lime-400/40 flex items-center gap-1 w-fit"
                  >
                    <Eye size={14} />
                    Demo
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MyProjects;
