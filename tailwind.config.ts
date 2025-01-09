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
        primary: "#8479D1",
        secondary: "#FFDAA3",
        white: "#FFFFFF",
        background: "#151515",
        warning: "#E12D2C",
        green: "#72BF77",
        yellow: "#FFDAA3",
        red: '#FF7777',
        black: '#232323',
        gray: '#6F6F6F'
      },
    },
  },
  plugins: [],
};
export default config;
