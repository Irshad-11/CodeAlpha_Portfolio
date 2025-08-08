import { useState, useEffect, useRef } from "react";
import { FaTimes, FaTerminal, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { IoChatboxEllipses } from "react-icons/io5";
import { IoIosCloseCircle } from "react-icons/io";
import { RiChatOffFill } from "react-icons/ri";
import { motion, AnimatePresence } from "framer-motion";
import 'tailwindcss/tailwind.css';
import { qnaDatabase } from "../data/myselfQnA";

// Normalize input for matching
const normalizeInput = (input) => input.toLowerCase().trim().replace(/\s+/g, ' ');

function TerminalChat() {
  const [isChatVisible, setIsChatVisible] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(true);
  const [chatMessages, setChatMessages] = useState([]);
  const [input, setInput] = useState("");
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [lastCategory, setLastCategory] = useState(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showNotice, setShowNotice] = useState(false);
  const chatOutputRef = useRef();
  const menuRef = useRef();
  const inputRef = useRef();
  const suggestionRef = useRef();
  const terminalRef = useRef();

  // Prevent background scrolling
  useEffect(() => {
    document.body.style.overflow = isChatVisible ? 'hidden' : 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [isChatVisible]);

  // Auto-scroll chat
  useEffect(() => {
    chatOutputRef.current?.scrollTo({ top: chatOutputRef.current.scrollHeight, behavior: "smooth" });
  }, [chatMessages, displayedText]);

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close terminal on outside click
  useEffect(() => {
    const handleClickOutsideTerminal = (e) => {
      if (terminalRef.current && !terminalRef.current.contains(e.target) && isChatVisible) {
        setIsChatVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutsideTerminal);
    return () => document.removeEventListener("mousedown", handleClickOutsideTerminal);
  }, [isChatVisible]);

  // Restore button with Ctrl+T
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.ctrlKey && e.key === 't') setIsButtonVisible(true);
    };
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, []);

  // Show notice after 10 seconds when chat is visible
  useEffect(() => {
    let timer;
    if (isChatVisible) {
      timer = setTimeout(() => {
        setShowNotice(true);
      }, 10000);
    }
    return () => clearTimeout(timer);
  }, [isChatVisible]);

  // Scroll suggestion bar
  const scrollSuggestions = (direction) => {
    const container = suggestionRef.current;
    if (!container) return;
    const scrollAmount = direction === 'left' ? -150 : 150;
    container.scrollTo({
      left: container.scrollLeft + scrollAmount,
      behavior: 'smooth'
    });
    setScrollPosition(container.scrollLeft + scrollAmount);
  };

  // Word-by-word typing effect
  const typeResponse = (text) => {
    setIsTyping(true);
    setDisplayedText('');
    const words = text.split(' ');
    let index = 0;

    const typeWord = () => {
      if (index < words.length) {
        setDisplayedText(prev => prev + (prev ? ' ' : '') + words[index]);
        index++;
        setTimeout(typeWord, 100);
      } else {
        setIsTyping(false);
        setChatMessages(prev => [...prev, { type: "bot", text }]);
        setDisplayedText('');
      }
    };
    typeWord();
  };

  // Handle user input
  const handleSendMessage = (suggestion = null) => {
    if (isTyping) return;
    const userInput = suggestion || input.trim();
    if (!userInput) return;

    setChatMessages(prev => [...prev, { type: "user", text: `$ ${userInput}` }]);
    const response = getResponse(userInput);

    if (response.action === "clear_terminal") {
      setChatMessages([{ type: "bot", text: "Terminal is Ready. Ask about my portfolio! Terminal @Beta_Version" }]);
      setLastCategory(null);
      setDisplayedText('');
    } else {
      typeResponse(response.text);
      setLastCategory(response.category || null);
    }

    setInput("");
  };

  // Response selection logic
  const getResponse = (input) => {
    const normalizedInput = normalizeInput(input);

    // 1. Check exact command matches
    if (qnaDatabase.commands?.[normalizedInput]) {
      if (normalizedInput === "/cls") return { action: "clear_terminal", category: null };
      const category = qnaDatabase.commands[normalizedInput];
      if (qnaDatabase[category]?.responses) {
        return {
          text: qnaDatabase[category].responses[Math.floor(Math.random() * qnaDatabase[category].responses.length)],
          category
        };
      }
      return { text: category, category: null };
    }

    // 2. Check exact suggestion matches
    if (qnaDatabase.suggestions.includes(normalizedInput)) {
      for (const category in qnaDatabase) {
        if (category === 'commands' || category === 'suggestions' || category === 'explicit') continue;
        if (qnaDatabase[category].keywords.some(keyword => normalizeInput(keyword) === normalizedInput)) {
          return {
            text: qnaDatabase[category].responses[Math.floor(Math.random() * qnaDatabase[category].responses.length)],
            category
          };
        }
      }
    }

    // 3. Check explicit content
    if (qnaDatabase.explicit?.keywords?.some(keyword => normalizedInput.includes(keyword))) {
      return {
        text: qnaDatabase.explicit.responses[Math.floor(Math.random() * qnaDatabase.explicit.responses.length)],
        category: 'explicit'
      };
    }

    // 4. Check follow-up questions
    const followUpKeywords = ['tell me more', 'yes', 'more about', 'what', 'features', 'how'];
    if (lastCategory && qnaDatabase[lastCategory] && followUpKeywords.some(keyword => normalizedInput.includes(keyword))) {
      const followUpCategory = lastCategory.includes('dropmymind') ? 'dropmymind_features' :
        lastCategory.includes('secondmind') ? 'secondmind_features' :
          lastCategory;
      if (qnaDatabase[followUpCategory]?.responses && normalizedInput.includes(lastCategory)) {
        return {
          text: qnaDatabase[followUpCategory].responses[Math.floor(Math.random() * qnaDatabase[followUpCategory].responses.length)],
          category: followUpCategory
        };
      }
    }

    // 5. Check keyword matches
    for (const category in qnaDatabase) {
      if (category === 'commands' || category === 'suggestions' || category === 'explicit') continue;
      if (qnaDatabase[category].keywords.some(keyword => normalizedInput.includes(normalizeInput(keyword)))) {
        return {
          text: qnaDatabase[category].responses[Math.floor(Math.random() * qnaDatabase[category].responses.length)],
          category
        };
      }
    }

    // 6. Fallback response
    return {
      text: qnaDatabase.fallback.responses[Math.floor(Math.random() * qnaDatabase.fallback.responses.length)],
      category: 'fallback'
    };
  };

  // Handle key presses
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  // Open chat
  const handleOpenChat = () => {
    setIsChatVisible(true);
    setIsMenuVisible(false);
    setChatMessages([{ type: "bot", text: "Terminal is Ready. Ask about my portfolio! Terminal @Beta_Version" }]);
    setLastCategory(null);
    setShowNotice(false);
    setTimeout(() => inputRef.current?.focus(), 300);
  };

  return (
    <>
      {/* Floating Terminal Button */}
      {isButtonVisible && (
        <motion.div
          className="fixed bottom-4 right-4 z-50"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <button
            className="bg-green-600 rounded-full p-3 hover:bg-green-700 transition-all text-white"
            onClick={() => setIsMenuVisible(!isMenuVisible)}
          >
            <FaTerminal className="w-4 h-4 sm:w-6 sm:h-6" />
          </button>
        </motion.div>
      )}

      {/* Menu Options */}
      <AnimatePresence>
        {isMenuVisible && (
          <motion.div
            ref={menuRef}
            className="fixed bottom-20 right-4 z-50 bg-gray-800 rounded-md shadow-lg p-2 w-32"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
          >
            <button
              className="flex items-center gap-2 w-full px-3 py-2 text-sm text-white hover:bg-gray-700 rounded"
              onClick={handleOpenChat}
            >
              <IoChatboxEllipses /> Chat
            </button>
            <button
              className="flex items-center gap-2 w-full px-3 py-2 text-sm text-white hover:bg-gray-700 rounded"
              onClick={() => { setIsButtonVisible(false); setIsMenuVisible(false); }}
            >
              <IoIosCloseCircle /> Close
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Terminal Chat Overlay */}
      <AnimatePresence>
        {isChatVisible && (
          <motion.div
            className="fixed inset-0 z-40 flex items-center justify-center bg-black/30 backdrop-blur-sm font-mono"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <div ref={terminalRef} className="relative w-11/12 max-w-lg sm:max-w-2xl">
              {/* Close Button */}
              <button
                className="absolute top-3 right-3 text-green-300 hover:text-red-400 transition-all"
                onClick={() => setIsChatVisible(false)}
              >
                <FaTimes className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* Terminal Container */}
              <div className="bg-black border .custom-scroll border-green-500 rounded-md shadow-xl flex flex-col h-[500px] sm:h-[600px] relative">
                {/* Terminal Header */}
                <div className="flex space-x-2 p-3 items-center">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <div className="text-green-500 text-sm">Terminal @Beta_Version</div>
                </div>

                {/* Chat Output */}
                <div
                  ref={chatOutputRef}
                  className="flex-1 overflow-y-auto text-[12px] md:text-sm whitespace-pre-wrap px-4 pb-2 text-white relative"
                >
                  {chatMessages.map((msg, idx) => (
                    <motion.p
                      key={idx}
                      className={msg.type === "user" ? "text-green-300" : "text-white"}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      {msg.text}
                    </motion.p>
                  ))}
                  {isTyping && (
                    <motion.p
                      className="text-white"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {displayedText}
                    </motion.p>
                  )}
                </div>

                {/* Notice Overlay */}
                <AnimatePresence>
                  {showNotice && (
                    <motion.div
                      className="absolute inset-0 top-[40px] bottom-[88px] bg-black/90 flex flex-col items-center justify-center z-10"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div
                        className="absolute inset-0"
                        style={{
                          backgroundImage: `url('https://raw.githubusercontent.com/Irshad-11/Documents/refs/heads/main/portfolio-logo-gif.gif')`,
                          backgroundSize: '280px',
                          backgroundPosition: 'center',
                          backgroundRepeat: 'no-repeat',
                          opacity: 0.1
                        }}
                      />
                      <motion.div
                        className="flex flex-col items-center justify-center text-center p-4 relative z-20"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3 }}
                      >
                        <RiChatOffFill className="text-yellow-400 w-12 md:w-24 h-12 md:h-24 mb-4" />
                        <p className="text-white font-sans text-lg md:text-2xl font-bold">
                          Since this is the Beta Version, the Chat response might be irresponsive. It will be available on the next major update. Thank You.
                        </p>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Suggestion Bar */}
                <div className="relative flex items-center px-4 py-2 border-t border-green-500">
                  <button
                    className="text-green-400 hover:text-green-300 mr-2 disabled:opacity-50"
                    onClick={() => scrollSuggestions('left')}
                    disabled={scrollPosition <= 0}
                  >
                    <FaArrowLeft />
                  </button>
                  <div
                    ref={suggestionRef}
                    className="flex-1 overflow-x-auto flex space-x-2 scrollbar-hidden"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                  >
                    {qnaDatabase.suggestions.map((suggestion, idx) => (
                      <motion.button
                        key={idx}
                        className="bg-gray-700 text-white text-xs px-3 py-1 rounded-full hover:bg-gray-600 whitespace-nowrap"
                        onClick={() => handleSendMessage(suggestion)}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        {suggestion}
                      </motion.button>
                    ))}
                  </div>
                  <button
                    className="text-green-400 hover:text-green-300 ml-2 disabled:opacity-50"
                    onClick={() => scrollSuggestions('right')}
                    disabled={scrollPosition >= (suggestionRef.current?.scrollWidth - suggestionRef.current?.clientWidth)}
                  >
                    <FaArrowRight />
                  </button>
                </div>

                {/* Input Area */}
                <div className="flex items-center p-3 border-t border-green-500">
                  <span className="text-green-300 mr-2">$</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyPress}
                    className="w-full bg-transparent text-white outline-none text-sm"
                    placeholder="Ask about my portfolio..."
                    autoFocus
                  />
                  <button
                    onClick={() => handleSendMessage()}
                    className="ml-2 text-green-400 hover:text-green-300 disabled:opacity-50"
                    disabled={isTyping}
                  >
                    ⏎
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default TerminalChat;