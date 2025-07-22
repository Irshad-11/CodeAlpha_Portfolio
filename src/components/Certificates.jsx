// src/components/Certificates.jsx
import { certificates } from "../data/certificates.js";
export default function Certificates() {
  return (
    <section id="certificates" className="py-20 bg-secondary text-text">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="font-heading text-2xl mb-4">Certificates</h2>
        <div className="flex gap-6 overflow-x-auto pb-4 no-scrollbar">
          {certificates.map(cert => (
            <div key={cert.id} className="glassmorphism min-w-[280px] rounded-lg p-5 shadow-lg hover:scale-105 duration-150">
              <img src={cert.logo} alt={cert.title} className="h-10 mb-2"/>
              <div className="font-heading">{cert.title}</div>
              <div className="text-muted text-sm">{cert.org}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
