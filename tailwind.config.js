/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        ink: {
          950: "#060a0e",
          900: "#0b131b",
          800: "#111c26",
        },
        accent: {
          400: "#5fd0c9",
          500: "#3ecfc1",
        },
      },
      boxShadow: {
        "glass-inner": "inset 0 1px 0 0 rgba(255,255,255,0.06)",
        "glow-accent": "0 0 0 1px rgba(95,208,201,0.35), 0 8px 30px -8px rgba(95,208,201,0.35)",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
