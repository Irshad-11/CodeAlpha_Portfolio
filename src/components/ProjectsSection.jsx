import React, { useState, useRef, useEffect } from "react"; // Added React import

import { projects } from "../data/projects";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const featured = projects.filter((p) => p.featured);

  // Update scroll button states
  const updateScrollState = () => {
    const el = scrollRef.current;
    if (el) {
      const atStart = el.scrollLeft <= 0;
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 5;
      setCanScrollLeft(!atStart);
      setCanScrollRight(!atEnd);
      console.log("Scroll State:", {
        scrollLeft: el.scrollLeft,
        scrollWidth: el.scrollWidth,
        clientWidth: el.clientWidth,
        canScrollLeft: !atStart,
        canScrollRight: !atEnd,
      });
    }
  };

  // Scroll left by one card width
  const scrollLeft = () => {
    const el = scrollRef.current;
    if (el) {
      console.log("Scroll Left:", {
        scrollLeft: el.scrollLeft,
        scrollWidth: el.scrollWidth,
        clientWidth: el.clientWidth,
      });
      el.scrollBy({ left: -320, behavior: "smooth" });
      setTimeout(updateScrollState, 600); // Wait for scroll animation
    } else {
      console.error("scrollRef is not attached");
    }
  };

  // Scroll right by one card width
  const scrollRight = () => {
    const el = scrollRef.current;
    if (el) {
      console.log("Scroll Right:", {
        scrollLeft: el.scrollLeft,
        scrollWidth: el.scrollWidth,
        clientWidth: el.clientWidth,
      });
      el.scrollBy({ left: 320, behavior: "smooth" });
      setTimeout(updateScrollState, 600); // Wait for scroll animation
    } else {
      console.error("scrollRef is not attached");
    }
  };

  // Initialize scroll state
  useEffect(() => { // This is line 65 where the error occurred
    updateScrollState();
    const el = scrollRef.current;
    if (el) {
      el.addEventListener("scroll", updateScrollState);
      return () => el.removeEventListener("scroll", updateScrollState);
    }
  }, []);

  return (
    <section id="projects" className="text-white p-6 md:p-12 bg-black">
      <h2 className="text-3xl md:text-4xl font-bold text-[#22c55e] mb-10">Projects</h2>

      {/* === Featured Projects === */}
      <div className="mb-16">
        <h3 className="text-2xl font-semibold mb-6 text-[#22c55e]">🚀 Featured Projects</h3>
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {featured.map((project) => (
            <ProjectCard
              key={project.title}
              project={project}
              onClick={setSelectedProject}
            />
          ))}
        </div>
      </div>

      {/* === All Projects === */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-semibold text-[#22c55e]">📁 All Projects</h3>
          <div className="flex gap-2">
            <button
              onClick={scrollLeft}
              disabled={!canScrollLeft}
              className="w-10 h-10 flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Scroll projects left"
            >
              <FaArrowLeft size={20} />
            </button>
            <button
              onClick={scrollRight}
              disabled={!canScrollRight}
              className="w-10 h-10 flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Scroll projects right"
            >
              <FaArrowRight size={20} />
            </button>
          </div>
        </div>
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4"
        >
          {projects.map((project) => (
            <div
              key={project.title}
              className="w-[320px] h-[360px] flex-shrink-0 snap-center"
            >
              <ProjectCard project={project} onClick={setSelectedProject} />
            </div>
          ))}
        </div>
      </div>

      {/* === Project Modal === */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
};

export default ProjectsSection;