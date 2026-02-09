import type {Config} from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#161a30",
        "primary-text": "#eeeff1",
        "secondary-text": "#c0c2c2",
        accent: "#7e74f1",
        "accent-hover": "#5d51e8",
        "border-custom": "#f1f1f1",
        line: "#d9d9d9",
        "secondary-bg": "#fbfbfb",
        "third-bg": "#f5f3fe"
      },
      fontFamily: {
        kanit: ["var(--font-kanit)", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;
