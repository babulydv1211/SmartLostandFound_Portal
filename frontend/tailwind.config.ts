import type { Config } from "tailwindcss"

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--slf-background) / <alpha-value>)",
        surface: "rgb(var(--slf-surface) / <alpha-value>)",
        primary: "rgb(var(--slf-primary) / <alpha-value>)",
        accent: "rgb(var(--slf-accent) / <alpha-value>)",
        foreground: "rgb(var(--slf-foreground) / <alpha-value>)",
        muted: "rgb(var(--slf-muted) / <alpha-value>)",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      borderRadius: {
        xl: "1.5rem",
      },
      boxShadow: {
        glass: "0 20px 45px -25px rgba(28,37,52,0.35)",
      },
    },
  },
  plugins: [],
}

export default config
