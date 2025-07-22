import { FaGithub, FaLinkedin, FaMapMarkerAlt, FaClock, FaReact } from "react-icons/fa";
import { SiTailwindcss } from "react-icons/si";
import { MdCopyright } from "react-icons/md";

export default function Footer() {
  return (
    <footer className="bg-[#0f0f0f] text-white py-10 mt-20 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-4 text-center space-y-6">

        {/* Message */}
        <div className="text-white/80 text-sm sm:text-base">
          Built with <FaReact className="inline text-[#61DAFB]" size={18} /> <span className="text-[#61DAFB]">React</span> and <SiTailwindcss className="inline text-[#38BDF8]" size={18} /> <span className="text-[#38BDF8]">Tailwind CSS</span> by <span className="text-[#22c55e] font-semibold">Irshad Hossain</span>
        </div>

        {/* Location and Time */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 text-white/60 text-sm">
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-[#22c55e]" />
            Bypass, Sadar, Mymensingh
          </div>
          <div className="flex items-center gap-2">
            <FaClock className="text-[#22c55e]" />
            {new Date().getFullYear()} · All rights reserved
          </div>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center gap-6 text-xl text-white/70">
          <a
            href="https://github.com/irshad-11"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#22c55e] transition-colors"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/irshad-hossain-785548323/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#22c55e] transition-colors"
          >
            <FaLinkedin />
          </a>
        </div>

        {/* Copyright */}
        <div className="text-white/50 text-xs flex items-center justify-center gap-1 pt-2">
          <MdCopyright size={14} />
          2025 Irshad Hossain
        </div>
      </div>
    </footer>
  );
}
