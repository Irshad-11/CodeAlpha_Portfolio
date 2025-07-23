import { skills } from "../data/skills";
import { motion } from "framer-motion";
import React from 'react';

// Import icon libraries
import * as Fa from "react-icons/fa";
import * as Si from "react-icons/si";
import * as Ai from "react-icons/ai";
import * as Io from "react-icons/io5";
import * as Bi from "react-icons/bi";
import * as Lia from "react-icons/lia";
import * as Tb from "react-icons/tb";
import * as Ri from "react-icons/ri";

// Map lib codes to actual imports
const iconLibraries = { Fa, Si, Ai, Io, Bi, Lia, Tb, Ri };

export default function Skills() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 120, damping: 12 },
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.3 },
    },
  };

  return (
    <section
      id="skills"
      className="py-24 bg-[#0f0f0f] text-white relative overflow-hidden"
    >
      {/* Glow Overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#22c55e]/10 via-white/5 to-[#22c55e]/10 blur-2xl opacity-30 pointer-events-none z-0" />

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-white tracking-tight">
          <span className="text-[#22c55e]">Tech</span> Stack
        </h2>

        {skills.map((group) => (
          <motion.div
            key={group.category}
            className="mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            <h3 className="text-xl md:text-2xl font-semibold mb-6 text-white/80 border-l-4 border-[#22c55e] pl-4">
              {group.category}
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
              {group.list.map(({ name, icon, color }) => {
                const { lib, name: iconName } = icon || {};
                const IconSet = iconLibraries[lib];
                const IconComponent = IconSet?.[`${lib}${iconName}`];

                return (
                  <motion.div
                    key={name}
                    className="group relative p-4 rounded-xl backdrop-blur-md bg-white/5 border border-white/10 shadow-inner hover:shadow-xl transition-shadow duration-300"
                    variants={cardVariants}
                    whileHover="hover"
                  >
                    <div className="flex flex-col items-center gap-2">
                      {IconComponent && (
                        <IconComponent
                          className="text-[#22c55e] group-hover:scale-110 transition duration-300"
                          size={32}
                        />
                      )}
                      <span className="text-sm text-white/90 font-medium text-center">
                        {name}
                      </span>
                    </div>

                    {/* Hover Glow Line */}
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-[2px] w-2/3 bg-[#22c55e] opacity-0 group-hover:opacity-80 transition duration-300" />
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
