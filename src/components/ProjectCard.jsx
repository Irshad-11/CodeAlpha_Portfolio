import React from "react";
import { FaExternalLinkAlt, FaGithub, FaLinkedin, FaFacebook, FaLightbulb } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";

const ProjectCard = ({ project, onClick }) => {
  return (
    <div
      onClick={() => onClick(project)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick(project)}
      className="w-[320px] h-[360px] flex-shrink-0 bg-neutral-900 rounded-xl relative overflow-hidden group cursor-pointer border-2 border-[#8b5cf6] hover:border-[#2dd4bf] transition-all duration-300 futuristic-shadow hover:futuristic-shadow focus:outline-none focus:ring-2 focus:ring-[#2dd4bf]"
      aria-label={`Open details for ${project.title}`}
    >
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-full object-cover transition-all duration-300 group-hover:brightness-75"
        loading="lazy"
      />
      <div className="absolute bottom-0 w-full p-4 bg-neutral-900/90 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
        <h3 className="text-lg font-semibold text-[#2dd4bf] truncate">{project.title}</h3>
        <p className="text-xs text-neutral-300 line-clamp-2 mt-1">{project.description}</p>
        <div className="flex items-center gap-2 text-xs text-neutral-400 mt-2">
          <span>{project.date}</span>
          <span className="px-2 py-1 bg-[#8b5cf6]/20 rounded-full">{project.status}</span>
        </div>
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-1 text-yellow-400 text-sm">
            <FaStar className="text-sm" />
            <span>{project.rating.toFixed(1)}</span>
          </div>
          <div className="flex gap-2 text-white/80">
            {project.socialLinks?.map((link, idx) => {
              const iconMap = {
                GitHub: <FaGithub className="hover:text-[#2dd4bf] transition-colors" />,
                LinkedIn: <FaLinkedin className="hover:text-[#2dd4bf] transition-colors" />,
                Facebook: <FaFacebook className="hover:text-[#2dd4bf] transition-colors" />,
              };
              return (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  aria-label={`${link.platform} link for ${project.title}`}
                  className="hover:scale-110 transition-transform"
                >
                  {iconMap[link.platform]}
                </a>
              );
            })}
            {project.liveLink && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                aria-label={`Live demo for ${project.title}`}
                className="hover:scale-110 transition-transform"
              >
                <FaExternalLinkAlt className="hover:text-[#2dd4bf] transition-colors" />
              </a>
            )}
            {project.ideaLink && (
              <a
                href={project.ideaLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                aria-label={`Project idea for ${project.title}`}
                className="hover:scale-110 transition-transform"
              >
                <FaLightbulb className="hover:text-[#2dd4bf] transition-colors" />
              </a>
            )}
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
          {project.techStack?.map((tech, i) => (
            <img
              key={i}
              src={tech.icon}
              alt={tech.name}
              className="h-5"
              title={tech.name}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;