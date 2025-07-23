import React, { useEffect } from "react";

import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaExternalLinkAlt } from "react-icons/fa";
import { FaGithub, FaLinkedin, FaFacebook, FaStar, FaLightbulb } from "react-icons/fa6";

const ProjectModal = ({ project, onClose }) => {
  // Prevent background scrolling
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  // Handle click outside to close modal
  useEffect(() => {
    const handleOutside = (e) => {
      if (e.target.id === "modal-bg") onClose();
    };
    window.addEventListener("click", handleOutside);
    return () => window.removeEventListener("click", handleOutside);
  }, [onClose]);

  if (!project) return null;

  // Animation variants for the modal
  const modalVariants = {
    hidden: { y: "100vh", opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
    exit: { y: "100vh", opacity: 0, transition: { duration: 0.4, ease: "easeIn" } },
  };

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          id="modal-bg"
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="relative w-full max-w-4xl max-h-[90vh] bg-black/80 rounded-xl shadow-lg overflow-y-auto scrollbar-hide"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Cover Image */}
            <div className="relative">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-[400px] object-cover rounded-t-xl"
              />
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white text-2xl p-2 rounded-full bg-black/50 hover:bg-black/70 transition"
                aria-label="Close modal"
              >
                <FaTimes />
              </button>
            </div>

            {/* Article-Type Content */}
            <article className="p-6 text-white">
              <header className="mb-6">
                <h2 className="text-3xl font-bold text-[#22c55e] mb-2">{project.title}</h2>
                <div className="flex items-center gap-4 text-sm text-gray-300">
                  <span>{project.date}</span>
                  <span className="px-2 py-1 bg-green-500/20 rounded-full">{project.status}</span>
                  <span className="flex items-center gap-1 text-yellow-400">
                    <FaStar />
                    {project.rating}
                  </span>
                </div>
              </header>

              <section className="mb-6">
                <p className="text-base leading-relaxed">{project.description}</p>
              </section>

              <section className="mb-6">
                <h3 className="text-xl font-semibold text-[#22c55e] mb-3">Tech Stack</h3>
                <div className="flex flex-wrap gap-3">
                  {project.techStack?.map((tech, i) => (
                    <img
                      key={i}
                      src={tech.icon}
                      alt={tech.name}
                      className="h-8"
                      title={tech.name}
                    />
                  ))}
                </div>
              </section>

              <section className="flex flex-col gap-3">
                <h3 className="text-xl font-semibold text-[#22c55e]">Links</h3>
                <div className="flex gap-4">
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-400 flex items-center gap-2 hover:text-green-300 transition"
                  >
                    <FaExternalLinkAlt />
                    Live Demo
                  </a>
                  <a
                    href={project.ideaLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-400 flex items-center gap-2 hover:text-green-300 transition"
                  >
                    <FaLightbulb />
                    Project Idea
                  </a>
                </div>
                <div className="flex gap-4">
                  {project.socialLinks?.map((link, idx) => {
                    const iconMap = {
                      GitHub: <FaGithub size={24} />,
                      LinkedIn: <FaLinkedin size={24} />,
                      Facebook: <FaFacebook size={24} />,
                    };
                    return (
                      <a
                        key={idx}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-green-400 transition"
                      >
                        {iconMap[link.platform]}
                      </a>
                    );
                  })}
                </div>
              </section>
            </article>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;