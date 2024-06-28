import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "purple" : "#cdb4db",
        "adblue" : "#a2d2ff",
        "skyblue" : "#bde0fe",
        "faintpink" : "#ffc8dd",
        "bluedarkish" : "#2a9d8f",
        "darkblue" : "#264653",
      }
    },
  },
  plugins: [],
};
export default config;
