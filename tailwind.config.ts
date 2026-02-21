import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        heading: ["var(--font-playfair)", "system-ui", "serif"]
      },
      colors: {
        med: {
          bg: "#f6f9fc",
          primary: "#2A7FFF",
          primarySoft: "#e1f5ff",
          emerald: "#18b79b",
          slate: "#0f172a"
        }
      },
      borderRadius: {
        "2xl": "1.5rem",
        "3xl": "2rem"
      },
      boxShadow: {
        soft: "0 18px 45px rgba(15, 23, 42, 0.08)",
        glow: "0 0 0 1px rgba(56, 189, 248, 0.4), 0 18px 45px rgba(15, 23, 42, 0.45)"
      },
      backdropBlur: {
        xs: "3px"
      },
      backgroundImage: {
        "med-gradient":
          "radial-gradient(circle at top, rgba(56, 189, 248, 0.3), transparent 55%), radial-gradient(circle at bottom, rgba(34, 197, 94, 0.2), transparent 60%)"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" }
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" }
        },
        "float-reverse": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(15px)" }
        },
        "scroll-y": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" }
        },
        "bounce-slow": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" }
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" }
        },
        pulseSoft: {
          "0%, 100%": { opacity: "0.25", transform: "scale(1)" },
          "50%": { opacity: "0.45", transform: "scale(1.05)" }
        }
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-slow": "float-slow 8s ease-in-out infinite",
        "float-reverse": "float-reverse 7s ease-in-out infinite",
        "float-delayed": "float 7.5s ease-in-out infinite",
        "scroll-y": "scroll-y 3s linear infinite",
        "bounce-slow": "bounce-slow 3s ease-in-out infinite",
        shimmer: "shimmer 2s infinite",
        "pulse-soft": "pulseSoft 9s ease-in-out infinite"
      }
    }
  },
  plugins: []
};

export default config;
