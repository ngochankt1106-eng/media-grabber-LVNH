import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bp: {
          bg: "#070709",
          card: "#111016",
          cardBorder: "#272234",
          surface: "#181622",
          pink: {
            DEFAULT: "#ff2d75",
            light: "#ff659b",
            soft: "#ffa5c3",
            hot: "#ff0055",
            neon: "#ff1493",
            glow: "rgba(255, 45, 117, 0.4)",
          },
          dark: {
            DEFAULT: "#0d0c12",
            deep: "#050507",
            elevated: "#1a1725",
          },
          glitter: {
            gold: "#fcd34d",
            pink: "#ff80bf",
            silver: "#f1f5f9",
          },
        },
      },
      boxShadow: {
        "neon-pink": "0 0 25px -5px rgba(255, 45, 117, 0.5), 0 0 10px -2px rgba(255, 45, 117, 0.3)",
        "neon-pink-lg": "0 0 40px -5px rgba(255, 45, 117, 0.65), 0 0 20px 0px rgba(255, 20, 147, 0.4)",
        "glitter": "0 0 15px rgba(255, 255, 255, 0.6), 0 0 30px rgba(255, 105, 180, 0.4)",
        "card-glow": "0 8px 32px 0 rgba(255, 45, 117, 0.12)",
      },
      backgroundImage: {
        "gradient-bp": "linear-gradient(135deg, #ff2d75 0%, #a855f7 50%, #ec4899 100%)",
        "gradient-pink-dark": "linear-gradient(180deg, #181423 0%, #0d0c12 100%)",
        "gradient-shimmer": "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)",
      },
      animation: {
        "twinkle": "twinkle 3s ease-in-out infinite",
        "float": "float 4s ease-in-out infinite",
        "pulse-glow": "pulseGlow 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "shimmer": "shimmer 2.5s infinite linear",
        "spin-slow": "spin 12s linear infinite",
      },
      keyframes: {
        twinkle: {
          "0%, 100%": { opacity: "0.3", transform: "scale(0.8)" },
          "50%": { opacity: "1", transform: "scale(1.2)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        pulseGlow: {
          "0%, 100%": {
            boxShadow: "0 0 20px rgba(255, 45, 117, 0.4), 0 0 40px rgba(255, 45, 117, 0.2)",
          },
          "50%": {
            boxShadow: "0 0 35px rgba(255, 45, 117, 0.7), 0 0 60px rgba(255, 45, 117, 0.4)",
          },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
