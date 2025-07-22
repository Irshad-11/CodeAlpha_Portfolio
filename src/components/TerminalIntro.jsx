import { useState, useEffect, useRef } from "react";
import { FaTimes } from "react-icons/fa";

const commands = [
  { cmd: "fetch profile --user irshad", reply: "Profile found: Irshad Hossain" },
  { cmd: "get education", reply: "Education: Software Engineering at UFTB" },
  { cmd: "list projects --completed", reply: "6+ major projects retrieved" },
  { cmd: "scan skills --summary", reply: "Expertise: 13 languages, libraries, frameworks" },
  {
    cmd: "connect portfolio --secure",
    reply:
      "🔗 Connecting to Irshad's Portfolio...\n\nAuthor: Irshad Hossain\nEducation: Software Engineering at UFTB\nProjects: 6+\nExpertise: 13 technologies"
  }
];

function TerminalIntro({ onFinish }) {
  const [visible, setVisible] = useState(true);
  const [step, setStep] = useState(0); // 0 = nothing, 1 = header, 2 = full terminal, 3 = typing
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCmd, setShowCmd] = useState(true);
  const [typedCmd, setTypedCmd] = useState("");
  const [typedReply, setTypedReply] = useState("");
  const terminalRef = useRef();

  // Step-wise reveal logic
  useEffect(() => {
    if (!visible) return;
    const stepTimers = [
      setTimeout(() => setStep(1), 200),     // Step 1: show header
      setTimeout(() => setStep(2), 800),     // Step 2: show full terminal
      setTimeout(() => setStep(3), 1500),    // Step 3: start typing
    ];
    return () => stepTimers.forEach(clearTimeout);
  }, [visible]);

  // Typing logic
  useEffect(() => {
    let timeout;
    if (step < 3 || !visible) return;

    if (showCmd) {
      if (typedCmd.length < commands[currentIndex].cmd.length) {
        timeout = setTimeout(() => {
          setTypedCmd((prev) => commands[currentIndex].cmd.slice(0, prev.length + 1));
        }, 40);
      } else {
        timeout = setTimeout(() => setShowCmd(false), 400);
      }
    } else {
      if (typedReply.length < commands[currentIndex].reply.length) {
        timeout = setTimeout(() => {
          setTypedReply((prev) => commands[currentIndex].reply.slice(0, prev.length + 1));
        }, 14);
      } else {
        timeout = setTimeout(() => {
          if (currentIndex < commands.length - 1) {
            setCurrentIndex((i) => i + 1);
            setTypedCmd("");
            setTypedReply("");
            setShowCmd(true);
          } else {
            setTimeout(() => {
              setVisible(false);
              setTimeout(() => onFinish?.(), 400);
            }, 1400);
          }
        }, 800);
      }
    }
    return () => clearTimeout(timeout);
  }, [step, typedCmd, typedReply, showCmd, currentIndex, onFinish, visible]);

  // Auto-scroll
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTo({ top: terminalRef.current.scrollHeight, behavior: "smooth" });
    }
  }, [typedCmd, typedReply, currentIndex]);

  const handleSkip = () => {
    setVisible(false);
    setTimeout(() => onFinish?.(), 300);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center text-green-400 font-mono">
      <div className="relative w-full max-w-2xl">
        {/* Skip Button */}
        <button
          className="absolute top-3 right-3 text-sm text-green-300 hover:text-red-400 transition-all z-10"
          onClick={handleSkip}
        >
          <FaTimes size={18} />
        </button>

        {/* Terminal Container */}
        <div
          className={`transition-all duration-700 bg-black border border-green-500 rounded-md shadow-xl overflow-hidden 
            ${step >= 2 ? "p-4 h-[480px]" : "h-[48px] p-2"} 
            flex flex-col`}
          style={{ width: "100%" }}
        >
          {/* Terminal Header */}
          <div className="flex space-x-2 mb-3">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>

          {/* Terminal Body (only when fully open) */}
          {step >= 3 && (
            <div
              ref={terminalRef}
              className="flex-1 overflow-y-auto text-sm sm:text-base whitespace-pre-wrap pr-2"
            >
              {Array.from({ length: currentIndex }).map((_, idx) => (
                <div key={idx} className="mb-2">
                  <div className="text-green-300">{`$-sys32> ${commands[idx].cmd}`}</div>
                  <div className="text-white">{commands[idx].reply}</div>
                </div>
              ))}

              {/* Typing Current */}
              <div>
                <span className="text-green-300">
                  $-sys32&gt; {typedCmd}
                  <span className="animate-pulse">█</span>
                </span>
                <div className="text-white">{typedReply}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TerminalIntro;
