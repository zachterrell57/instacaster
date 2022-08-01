/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        "lg-card": "600px",
      },
      fontSize: {
        tiny: ".625rem",
      },
      fontFamily: {
        "source-code-pro": ["Source Code Pro", "monospace"],
      },
      colors: {
        primary: "#f5f5f5",
        "border-gray": "#dbdbdb",
        "dark-gray-text": "#262626",
        "purple-main": "#8765CC",
      },
      maxWidth: {
        avatar: "32px",
      },
      minWidth: {
        "lg-card": "600px",
      },
    },
  },
  plugins: [require("daisyui")],
};
