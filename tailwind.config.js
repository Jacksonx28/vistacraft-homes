/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy:  "#0A2540",
        royal: "#1E40AF",
        "royal-light": "#3B5FD4",
      },
      fontFamily: {
        cormorant: ["'Cormorant Garamond'", "Georgia", "serif"],
        sans: ["'DM Sans'", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "navy-gradient": "linear-gradient(135deg, #0A2540 0%, #0D3060 40%, #0A2540 100%)",
      },
    },
  },
  plugins: [],
};
