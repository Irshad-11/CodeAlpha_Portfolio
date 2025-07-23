import React from 'react'; // ✅ Add this
import { useState } from 'react';
import TerminalIntro from './components/TerminalIntro';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/ProjectsSection';
import About from './components/About';
import Certificates from './components/Certificates';
import ContactMe from './components/Contact';
import Footer from './components/Footer';
import SkillRadarChart from "./components/SkillRadarChart";
import './index.css';

function App() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <>
      {showIntro && <TerminalIntro onFinish={() => setShowIntro(false)} />}
      {!showIntro && (
        <div className="font-body overflow-x-auto scrollbar-hide bg-primary">
          <Hero />
          <Skills />
          <Projects />
          <About />
          <ContactMe />
          <Footer />
        </div>
      )}
    </>
  );
}

export default App;
