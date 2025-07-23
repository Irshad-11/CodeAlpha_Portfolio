import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { FaCheckCircle, FaCamera, FaDesktop, FaPuzzlePiece } from "react-icons/fa";
import { AiFillProduct } from "react-icons/ai";
import SkillRadarChart from "./SkillRadarChart";
import { programmingSkills, softSkills , technicalSkills } from "../data/skillData";


export default function About() {
  const [counters, setCounters] = useState({ years: 0, projects: 0, problems: 0, skills: 0 });
  const [showCharts, setShowCharts] = useState(false);
  const hasAnimated = useRef(false);

  const targetCounters = { years: 2, projects: 12, problems: 120, skills: 20 };

  useEffect(() => {
    const section = document.getElementById("about");

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;

          let start = null;
          const duration = 2000;

          const step = (timestamp) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);

            setCounters({
              years: Math.floor(progress * targetCounters.years),
              projects: Math.floor(progress * targetCounters.projects),
              problems: Math.floor(progress * targetCounters.problems),
              skills: Math.floor(progress * targetCounters.skills),
            });

            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              setShowCharts(true);
            }
          };
          requestAnimationFrame(step);

          const fadeElements = section.querySelectorAll(".fade-in");
          fadeElements.forEach((el) => el.classList.add("visible"));
        }
      },
      {
        threshold: 0.3, // trigger earlier
        rootMargin: "0px 0px -20% 0px",
      }
    );

    if (section) observer.observe(section);
    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <section id="about" className="py-16 dark-theme text-white">
      <div className="max-w-6xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold tracking-wide text-[#22c55e]">ABOUT ME</h1>
          <p className="text-lg mt-2">
            I'm <strong>Irshad Hossain</strong>, Programmer / Developer
          </p>
        </div>

        {/* Description */}
        <div className="text-center mb-10 text-gray-300 max-w-3xl mx-auto text-sm">
          <p>
            From wireframe to interaction, I build UI experiences that look sharp and feel smooth. Whether it's a curated project card or an elegant modal view, I combine design thinking with solid engineering.
            I love diving deep into DSA and crafting scalable logic, not just for theory—but to solve real problems.
            I build what I wish existed in my own life, design with purpose, and develop tools that help people stay productive.
            It's more than just code—it's clarity, creativity, and the joy of solving things that matter.
          </p>
        </div>

        {/* Stats & What I Do */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Side: Stats */}
          <motion.div
            className="grid grid-cols-2 gap-6 flex-1 fade-in"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="card-bg p-6 text-center">
              <div className="counter text-6xl md:text-7xl text-[#22c55e]">{counters.years}+</div>
              <p className="text-xs md:text-xl text-gray-400 mt-1">Years Experience</p>
            </div>
            <div className="card-bg p-6 text-center">
              <div className="counter text-6xl md:text-7xl text-[#22c55e]">{counters.projects}+</div>
              <p className="text-xs md:text-xl text-gray-400 mt-1">Project Done</p>
            </div>
            <div className="card-bg p-6 text-center">
              <div className="counter text-6xl md:text-7xl text-[#22c55e]">{counters.problems}+</div>
              <p className="text-xs md:text-xl text-gray-400 mt-1">Problem Solved</p>
            </div>
            <div className="card-bg p-6 text-center">
              <div className="counter text-6xl md:text-7xl text-[#22c55e]">{counters.skills}+</div>
              <p className="text-xs md:text-xl text-gray-400 mt-1">Skills</p>
            </div>
          </motion.div>

          {/* Right Side: What I Do */}
          <motion.div
            className="card-bg p-6 flex-1 fade-in"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-[#22c55e] mb-4">What I Do?</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <FaPuzzlePiece className="text-[#22c55e] text-9xl md:text-7xl mt-1" />
                <div>
                  <h3 className="font-semibold text-[#22c55e]">Creative Solution</h3>
                  <p className="text-xs text-gray-400">
                    I explore problems not just to fix them, but to redesign them into something beautiful, functional,
                    and efficient. Every UI, every interaction is a carefully considered solution with intent.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <AiFillProduct className="text-[#22c55e] text-9xl md:text-7xl mt-1" />
                <div>
                  <h3 className="font-semibold text-[#22c55e]">Product</h3>
                  <p className="text-xs text-gray-400">
                    I don’t just build features—I build usable products rooted in genuine everyday needs. My goal is to
                    ship ideas that people rely on, not just admire from afar.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <FaDesktop className="text-[#22c55e] text-9xl md:text-7xl mt-1" />
                <div>
                  <h3 className="font-semibold text-[#22c55e]">Web App (PWA, SPA)</h3>
                  <p className="text-xs text-gray-400">
                    I’m drawn to the dynamic potential of web apps—fluid, interactive, and responsive. Whether it’s a
                    PWA or SPA, I aim to create experiences that go beyond static websites.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Radar Charts only appear after counters finish */}
        {showCharts && (
          <div className="flex flex-col flex-wrap lg:flex-row gap-6 mt-6">
            <div className="flex-1">
              <SkillRadarChart data={programmingSkills} title="Prog & Frameworks Skill" />
            </div>
            <div className="flex-1">
              <SkillRadarChart data={technicalSkills} title="Technical Skill" />
            </div>
            <div className="flex-1">
              <SkillRadarChart data={softSkills} title="Soft Skills" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
