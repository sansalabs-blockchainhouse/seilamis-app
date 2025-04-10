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
        secondary: "#722AA3",
        sei: '#9E1E1A',
        base: '#0052FF'
      },
      backgroundImage: {
        "bg@1": "url('/bg@1.jpg')",
        "bg@2": "url('/bg@2.png')",
        "bg@3": "url('/bg@3.png')",
      },
    },
    fontFamily: {
      london: ["London", "sans-serif"],
      arcade: ["Arcade", "sans-serif"],

    },
  },
  plugins: [require("daisyui"), require("tailwindcss-animated")],
};
export default config;
