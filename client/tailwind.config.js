/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
export default {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}", // Adjust paths based on your project structure
    "./index.html", // Include this if you use HTML files directly
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3498db",
        secondary: "#f1c40f",
        accent: "#2ecc71",
        neutral: "#3d3d3d",
        "background": "#f5f5f5",
        "background-dark": "#333",
        "text": "#333",
        "text-light": "#fff",
        "text-dark": "#333",
        "text-red": "#830109",
        "border": "#ddd",
        "border-dark": "#333",
        "shadow": "#333",
        "shadow-dark": "#333",
        "shadow-light": "#fff",
        },
    },
  },
  plugins: [daisyui],
};