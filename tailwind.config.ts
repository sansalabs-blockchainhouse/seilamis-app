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
        primary: "#AA6938",
      },
      backgroundImage: {
        "sky": "url('/sky.webp')",
      },
    },
  },
  plugins: [require("daisyui"), require("tailwindcss-animated")],
};
export default config;
