module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        kumbh: ["'Kumbh Sans'", "sans-serif"],
        sans: ["'Kumbh Sans'", "system-ui", "sans-serif"],
      },
      colors: {
        primary: {
          DEFAULT: "#C8EE44",
          dark: "#2B3139",
        },
        secondary: {
          DEFAULT: "#29A073",
        },
        gray: {
          50: "#F5F5F5",
          100: "#E8E8E8",
          200: "#DADADA",
          300: "#929EAE",
          400: "#8E8E8E",
          500: "#6B6B6B",
          600: "#525252",
          700: "#3A3A3A",
          800: "#2B2B2B",
          900: "#1A1A1A",
        },
      },
      borderRadius: {
        xl: "0.75rem",
        "2xl": "1rem",
      },
      boxShadow: {
        'lime-glow': '0 10px 25px rgba(197, 248, 42, 0.15)',
        'lime-glow-lg': '0 15px 35px rgba(197, 248, 42, 0.2)',
      },
      keyframes: {
        // Page transitions
        "fade-out-slide": {
          "0%": { opacity: "1", transform: "translateY(0) scale(1)" },
          "100%": { opacity: "0", transform: "translateY(-20px) scale(0.98)" },
        },
        "page-enter": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "page-enter-bounce": {
          "0%": { opacity: "0", transform: "translateY(30px) scale(0.95)" },
          "60%": { opacity: "1", transform: "translateY(-5px) scale(1.01)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        
        // Fade animations
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-out": {
          "0%": { opacity: "1", transform: "translateY(0)" },
          "100%": { opacity: "0", transform: "translateY(-10px)" },
        },
        
        // Stagger animations
        "stagger-fade": {
          "0%": { opacity: "0", transform: "translateY(10px) scale(0.98)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        
        // Slide animations
        "slide-in-right": {
          "0%": { opacity: "0", transform: "translateX(20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        
        // Tooltip
        "tooltip-enter": {
          "0%": { opacity: "0", transform: "translateY(5px) scale(0.95)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        
        // Shimmer effect
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        
        // Pulse animations
        "skeleton-pulse": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        
        // Card animations
        "card-vibrate": {
          "0%, 100%": { transform: "rotate(0deg) scale(1)" },
          "25%": { transform: "rotate(-1deg) scale(1.02)" },
          "50%": { transform: "rotate(1deg) scale(1.03)" },
          "75%": { transform: "rotate(-1deg) scale(1.02)" },
        },
        
        // Particle effect
        "float-particle": {
          "0%": { opacity: "0", transform: "translate(0, 0) scale(0)" },
          "50%": { opacity: "0.6", transform: "translate(20px, -40px) scale(1.2)" },
          "100%": { opacity: "0", transform: "translate(40px, -80px) scale(0.5)" },
        },
        
        // Line draw (for charts)
        "draw-line": {
          "0%": { strokeDashoffset: "1000" },
          "100%": { strokeDashoffset: "0" },
        },
      },
      animation: {
        // Page transitions
        "fade-out-slide": "fade-out-slide 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "page-enter": "page-enter 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "page-enter-bounce": "page-enter-bounce 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        
        // Fade animations
        "fade-in-up": "fade-in-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-out": "fade-out 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        
        // Stagger animations
        "stagger-fade": "stagger-fade 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        
        // Slide animations
        "slide-in-right": "slide-in-right 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        
        // Tooltip
        "tooltip-enter": "tooltip-enter 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        
        // Shimmer
        shimmer: "shimmer 1.5s infinite",
        
        // Pulse
        "skeleton-pulse": "skeleton-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        
        // Card effects
        "card-vibrate": "card-vibrate 0.3s ease-in-out",
        
        // Particle
        "float-particle": "float-particle 2s ease-in-out forwards",
        
        // Chart line
        "draw-line": "draw-line 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      },
      transitionDuration: {
        400: "400ms",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};