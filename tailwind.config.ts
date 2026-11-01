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
        ink: {
          DEFAULT: "oklch(var(--c-ink) / <alpha-value>)",
          raised: "oklch(var(--c-ink-raised) / <alpha-value>)",
          sunken: "oklch(var(--c-ink-sunken) / <alpha-value>)"
        },
        paper: {
          DEFAULT: "oklch(var(--c-paper) / <alpha-value>)",
          dim: "oklch(var(--c-paper-dim) / <alpha-value>)",
          faint: "oklch(var(--c-paper-faint) / <alpha-value>)"
        },
        rule: {
          DEFAULT: "oklch(var(--c-rule) / <alpha-value>)",
          strong: "oklch(var(--c-rule-strong) / <alpha-value>)"
        },
        accent: {
          DEFAULT: "oklch(var(--c-accent) / <alpha-value>)",
          deep: "oklch(var(--c-accent-deep) / <alpha-value>)"
        }
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"]
      },
      fontSize: {
        hero: ["clamp(3.1rem, 11.5vw, 6rem)", {lineHeight: "0.86", letterSpacing: "-0.035em"}],
        title: ["clamp(2rem, 5.2vw, 3.25rem)", {lineHeight: "0.95", letterSpacing: "-0.028em"}],
        lede: ["clamp(1.0625rem, 1.15vw, 1.1875rem)", {lineHeight: "1.65"}]
      },
      maxWidth: {
        shell: "78rem",
        measure: "68ch"
      },
      transitionTimingFunction: {
        expo: "cubic-bezier(0.16, 1, 0.3, 1)"
      },
      zIndex: {
        nav: "50",
        overlay: "45",
        progress: "60"
      }
    }
  },
  plugins: []
};

export default config;
