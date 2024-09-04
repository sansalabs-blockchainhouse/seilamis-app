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
        sei: '#9E1E1A'
      },
      backgroundImage: {
        "sky": "url('/sky.jpg')",
      },
    },
  },
  plugins: [require("daisyui"), require("tailwindcss-animated")],
};
export default config;
