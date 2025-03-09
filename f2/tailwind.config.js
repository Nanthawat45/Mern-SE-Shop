/** @type {import('tailwindcss').Config} */
import withMT from "@material-tailwind/react/utils/withMT";
import daisyui from "daisyui";
export default withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        red: "#830109",
        secondary: "#555",
        primaryBG: "#FCFCFC",
      },
    },
  },
  plugins: [daisyui],
});
// export default {
//   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
//   theme: {
//     extend: {
//       colors: {
//         red: "#830109",
//         secondary: "#555",
//         primaryBG: "#FCFCFC",
//       },
//     },
//   },
//   plugins: [daisyui],
// };
