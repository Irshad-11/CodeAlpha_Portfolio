import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaLinkedin, FaGithub, FaFacebook, FaBars, FaTimes, FaDownload } from 'react-icons/fa';

const HeroSection = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const words = [
    "Programmer",
    "Web Developer and Designer",
    "Personalized Web App",
    "Works on SPA PWA",
    "Figma, Git and 20+ skills"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % words.length);
    }, 5000); // change every 3 seconds
    return () => clearInterval(interval);
  }, []);

  const heroImage = "https://i.pinimg.com/1200x/64/dc/95/64dc95ce16dfc15a1f30b8f5af7c94ef.jpg";

  return (
    <div className="relative bg-black text-white overflow-hidden font-sans min-h-screen">
      {/* Top Header */}
      <div className="relative z-20 flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <img
            src="https://img.icons8.com/?size=100&id=w5Zl82NTjDAU&format=png&color=000000"
            alt="Logo"
            className="w-10 h-10 bg-white rounded-full p-1"
          />
          <h1 className="text-2xl sm:text-3xl font-bold font-mono text-white">SoftLab</h1>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-6 text-sm">
          {['Home', 'Skills', 'Projects', 'About', 'ContactMe'].map(link => (
            <a key={link} href={`#${link.toLowerCase()}`} className="hover:text-green-400 transition">
              {link}
            </a>
          ))}
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden text-xl cursor-pointer" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-black px-6 pb-4 z-20"
          >
            <div className="flex flex-col space-y-3 text-sm">
              {['Home', 'About', 'Skills', 'Projects', 'ContactMe'].map(link => (
                <a key={link} href={`#${link.toLowerCase()}`} className="hover:text-green-400 transition">
                  {link}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 flex flex-col md:flex-row items-center justify-between px-2 md:px-12 -mt-16 md:-mt-10"
      >
        {/* Image */}
        <div className="w-full md:w-1/2 mb-8 md:mb-0 relative order-1 md:order-2">
          <img
            src={heroImage}
            alt="Hero"
            className="w-full h-[400px] md:h-full object-cover object-top opacity-90 mask-all-edges"
          />
        </div>

        {/* Text Content */}
        <div className="w-full -mt-10 md:mt-0 md:w-1/2 max-w-xl md:text-left pl-[30px] order-2 md:order-1">
          <h1 className="text-5xl md:text-8xl font-bold md:mb-4 leading-tight">
            Hello<span className="text-[#22c55e]">.</span>
          </h1>
          <h2 className="text-xl md:text-6xl font-semibold">
            <span className="text-gray-400">I'm</span> Irshad Hossain
          </h2>

          {/* Magnetic Text */}
          <div className="mt-4 md:mt-6 text-sm md:text-2xl h-10 md:h-12 overflow-hidden flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={words[index]}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -30, opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="text-[#22c55e] font-semibold text-lg md:text-2xl"
              >
                {words[index]}
              </motion.div>
            </AnimatePresence>

          </div>

          {/* Download CV Button */}
          <div className="mt-6">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/cv.pdf"
              download
              className="inline-flex items-center gap-2 
               bg-[#22c55e] text-black 
               px-4 py-2 md:px-6 md:py-3 
               rounded-full font-semibold 
               text-sm md:text-base 
               shadow-lg transition-all duration-300"
            >
              <FaDownload className="text-base md:text-lg" />
              Download CV
            </motion.a>
          </div>

        </div>
      </motion.div>

      {/* Bottom Line and Social Icons */}
      <div className="w-full flex justify-end items-center px-6 md:px-12 py-4">
        <div className="flex items-center justify-center space-x-2 md:space-x-5">
          <div className="h-px w-20 bg-gray-500"></div>
          <a href="https://www.facebook.com/irshad.risad" target="_blank" rel="noopener noreferrer">
            <FaFacebook className="hover:text-[#22c55e] duration-300 transition-all md:text-2xl" />
          </a>
          <a href="https://github.com/Irshad-11/" target="_blank" rel="noopener noreferrer">
            <FaGithub className="hover:text-[#22c55e] duration-300 transition-all md:text-2xl" />
          </a>
          <a href="https://www.linkedin.com/in/irshad-hossain-785548323/" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="hover:text-[#22c55e] duration-300 transition-all md:text-2xl" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
