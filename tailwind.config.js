/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: "#051633",
        accent: "#2563EB",
        secondary: "#1E293B",
      },
      fontFamily: {
        mono: ["Fira Mono", "Consolas", "Menlo", "monospace"],
        heading: ["Poppins", "Montserrat", "sans-serif"],
        body: ["Inter", "Nunito Sans", "sans-serif"],
        dancing: ['Dancing Script', 'cursive'],
      },
      animation: {
        blink: 'blink 1s step-start infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0 },
        }
      }
    },
  },
  plugins: [],
}