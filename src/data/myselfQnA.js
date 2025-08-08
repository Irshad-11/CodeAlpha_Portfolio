export const qnaDatabase = {
  about: {
    keywords: [
      'who is irshad', 'tell me about yourself', 'who are you', 'introduce yourself', 
      'about you', 'hey', 'hi', 'hello', 'how are you', 'how’s your day', 'how you doing', 
      'greeting', 'status', 'about irshad'
    ],
    responses: [
      "Hello! I'm Irshad Hossain, a Software Engineering student at UFTB in Mymensingh, Bangladesh. I’m passionate about building innovative web apps like Second Mind, a PLMS coded in just 10 days with AI. Want to dive into my projects or skills?",
      "Hi there! I'm Irshad, a Software Engineering student at UFTB. I love turning complex problems into clean code, like my GradeEasy CGPA tool. Curious about my portfolio or tech stack?",
      "Greetings! I'm Irshad, a coder at UFTB specializing in SPAs and PWAs. Check out my DropMyMind SaaS idea or ask about my coding journey!"
    ]
  },
  skills: {
    keywords: ['skills', 'tech', 'programming', 'code', 'languages', 'framework', 'what can you do', 'what are your skills'],
    responses: [
      "I’m skilled in C, JavaScript, Python, Java, and C++, with expertise in React and Tailwind CSS for sleek UIs. I also work with pyGame, JsPDF, and Framer Motion, and I’m sharpening my DSA with C++ and OOP with Java. Want to explore my tech stack?",
      "My toolkit includes JavaScript, Python, C, Java, C++, plus React and Tailwind CSS for building UIs. I’m diving deep into Data Structures and Algorithms and Java OOP. Curious about what I can build?",
      "I code in C, JavaScript, Python, Java, and C++, focusing on React and Tailwind CSS for interfaces. I’m also advancing in DSA and OOP. Interested in my coding skills?"
    ]
  },
  projects: {
    keywords: ['projects', 'portfolio', 'work', 'build', 'created', 'what have you built', 'what projects', 'your projects', 'about your project'],
    responses: [
      "I’ve built some cool projects: GradeEasy, a CGPA calculator for UFTB students; Second Mind, an AI-powered learning system; and DropMyMind, a SaaS for organizing ideas. Which one sparks your interest?",
      "My portfolio features GradeEasy for CGPA tracking, Second Mind for personalized learning, and DropMyMind, a SaaS in progress. Want details on any of these?",
      "Check out my work: Simple Text Cleaner, a regex tool; Second Mind, a PLMS; and DropMyMind, a SaaS platform. Which project do you want to explore?"
    ]
  },
  gradeeasy: {
    keywords: ['gradeeasy', 'cgpa', 'calculator', 'grade easy', 'what is gradeeasy', 'gradeeasy tool'],
    responses: [
      "GradeEasy is my CGPA calculator for UFTB students, integrating our course outline for seamless grade tracking. It’s a game-changer for my department! Want to know about its features or tech?",
      "GradeEasy simplifies CGPA calculations for UFTB students with a built-in course outline. Curious about how I built it or its functionality?",
      "With GradeEasy, I turned UFTB’s course outline into a user-friendly CGPA tool. Interested in its development process?"
    ]
  },
  secondmind: {
    keywords: ['second mind', 'plms', 'learning system', 'secondmind', 'tell me about second mind', 'what is second mind'],
    responses: [
      "Second Mind is my flagship SPA—a Personalized Learning Management System built with AI in just 10 days. It optimizes academic workflows. Want to explore its features?",
      "Second Mind, a PLMS, helps balance studies and skills, coded with AI in a 15-day sprint. Interested in its capabilities?",
      "Second Mind is an SPA for managing academic life, built swiftly with AI. Curious about its technical details?"
    ]
  },
  secondmind_features: {
    keywords: ['second mind features', 'second mind functionality', 'tell me more about second mind', 'what does second mind do', 'how does second mind work'],
    responses: [
      "Second Mind offers a dynamic dashboard to track courses, skills, and goals, with AI-driven suggestions for balancing academics and projects. You can log tasks, set reminders, and visualize progress. Curious about its tech stack?",
      "Second Mind provides course tracking, skill-building plans, and AI-powered insights to streamline academic goals. Want to know how it’s built?",
      "With Second Mind, you get a personalized dashboard for courses and tasks, enhanced by AI schedule optimization. Interested in its React-based UI?"
    ]
  },
  simpletextcleaner: {
    keywords: ['simple text cleaner', 'text cleaner', 'find replace', 'regex', 'what is simple text cleaner'],
    responses: [
      "Simple Text Cleaner is my regex-powered tool for fast, ad-free text editing. It’s lightweight and efficient. Want to know how it stands out?",
      "I built Simple Text Cleaner for seamless regex-based text editing, keeping it bloat-free. Curious about its regex features?",
      "Simple Text Cleaner offers clean find-and-replace functionality with regex. Interested in how it compares to other tools?"
    ]
  },
  dropmymind: {
    keywords: ['dropmymind', 'drop my mind', 'saas', 'dumping ground', 'what does dropmymind do', 'what is dropmymind', 'okay so what is drop my mind'],
    responses: [
      "DropMyMind is my SaaS vision—a platform for organizing ideas, links, and notes in a visual timeline. It’s in development but already exciting! Want to learn about its features?",
      "I’m working on DropMyMind, a SaaS for capturing texts, links, and screenshots in a timeline. Interested in its concept?",
      "DropMyMind is a SaaS for busy minds, allowing you to store and search ideas effortlessly. Curious about its development plans?"
    ]
  },
  dropmymind_features: {
    keywords: ['dropmymind features', 'dropmymind timeline', 'tell me more about dropmymind', 'how does dropmymind work'],
    responses: [
      "DropMyMind’s timeline auto-organizes texts, links, and screenshots by date, with search and tagging for easy access. It’s perfect for creative minds! Want to know about its tech?",
      "DropMyMind features a visual timeline for ideas, auto-saved links, and a robust search tool. It’s your second brain! Curious about its progress?",
      "With DropMyMind, you can drop notes or links into a timeline, tag them, and search later. Interested in its SaaS potential?"
    ]
  },
  hobbies: {
    keywords: ['hobbies', 'fun', 'like to do', 'free time', 'interests', 'what do you enjoy', 'what are your hobbies'],
    responses: [
      "Outside coding, I enjoy music, strategy gaming, and contributing to open-source projects. Want to know my favorite game or music genre?",
      "When I’m not coding, I unwind with music, dive into strategy games, or explore open-source ideas. Curious about my hobbies?",
      "My hobbies include music, gaming, and open-source contributions. Interested in what games I play or projects I’m eyeing?"
    ]
  },
  time: {
    keywords: ['time', 'clock', 'what time', 'what time is it', 'current time'],
    responses: [
      `It’s ${new Date().toLocaleTimeString('en-US', { timeZone: 'Asia/Dhaka' })} in Mymensingh, perfect for coding! Want to discuss my projects?`,
      `Current time: ${new Date().toLocaleTimeString('en-US', { timeZone: 'Asia/Dhaka' })}. Ready to explore my skills or portfolio?`,
      `It’s ${new Date().toLocaleTimeString('en-US', { timeZone: 'Asia/Dhaka' })} in Mymensingh. Ask about DropMyMind to dive in!`
    ]
  },
  explicit: {
    keywords: ['fuck', 'sex', 'explicit', 'quantum physics', 'politics', 'religion'],
    responses: [
      "Let’s keep it focused! I’d love to share more about my projects like Second Mind or my skills. What’s on your mind?",
      "That’s a bit off-topic. How about asking about DropMyMind or my coding expertise instead?",
      "I’m here for tech talk! Try asking about my projects or skills for a great chat."
    ]
  },
  fallback: {
    keywords: [],
    responses: [
      "I’m not sure I caught that! Try asking about my projects, skills, or type ‘/help’ for ideas.",
      "Hmm, that’s a new one! Ask about my portfolio, DropMyMind, or coding skills to get started!",
      "My terminal’s a bit puzzled. Try ‘What are your projects?’ or ‘/help’ for suggestions!"
    ]
  },
  commands: {
    '/help': "Try commands like /about, /skills, /projects, /gradeeasy, /secondmind, /dropmymind, /hobbies, /time, or /cls. You can also ask questions like ‘What are your projects?’ or ‘Tell me about yourself’!",
    '/about': 'about',
    '/skills': 'skills',
    '/projects': 'projects',
    '/gradeeasy': 'gradeeasy',
    '/secondmind': 'secondmind',
    '/simpletextcleaner': 'simpletextcleaner',
    '/dropmymind': 'dropmymind',
    '/hobbies': 'hobbies',
    '/cls': 'clear_terminal',
    '/time': 'time'
  },
  suggestions: [
    'Tell me about yourself',
    'What are your skills?',
    'What projects have you built?',
    'What is GradeEasy?',
    'Tell me about Second Mind',
    'What does DropMyMind do?',
    'What are your hobbies?',
    'What time is it?',
    '/help',
    '/cls'
  ]
};