/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'blue': '0 4px 6px rgba(59, 130, 246, 0.5)', // blue-500
        'blue-lg': '0 10px 15px rgba(59, 130, 246, 0.6)', // larger blue shadow
      },
    },
    animation: {
      "fade-in-up": "fadeInUp 1s ease-out",
    },
    keyframes: {
      fadeInUp: {
        "0%": { opacity: 0, transform: "translateY(20px)" },
        "100%": { opacity: 1, transform: "translateY(0)" },
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
}


