const sections = [
  { name: "Home", id: "hero" },
  { name: "Skills", id: "skills" },
  { name: "Projects", id: "projects" },
  { name: "About", id: "about" },
  { name: "Certificates", id: "certificates" },
  { name: "Contact", id: "contact" },
];

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-40 bg-black/80 backdrop-blur-md border-b border-white/10 scroll-smooth">
      <div className="max-w-6xl mx-auto flex justify-between items-center py-3 px-4 md:px-6">
        {/* Logo */}
        <div className="text-2xl font-bold text-[#22c55e] tracking-tight">
        </div>

        {/* Nav Links */}
        <ul className="flex gap-4 md:gap-6 text-sm md:text-base font-medium text-white/80">
          {sections.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className="hover:text-[#22c55e] transition-colors duration-200"
              >
                {section.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
