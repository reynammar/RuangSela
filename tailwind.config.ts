import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        sage: {
          50: '#f4f6f4',
          100: '#e5ebe4',
          200: '#cbd6c9',
          300: '#a8baab',
          400: '#839b87',
          500: '#647e68',
          600: '#4d6350',
          700: '#3f5042',
          800: '#344136',
          900: '#2b362e',
          950: '#151c17',
        },
        softBlue: {
          50: '#f0f7fe',
          100: '#e0effd',
          200: '#badffa',
          300: '#7cc2f5',
          400: '#5ab0f0',
          500: '#459de6', // User's requested color
          600: '#2d82cf',
          700: '#256bb1',
          800: '#235891',
          900: '#204a76',
          950: '#142d4a',
        }
      },
    },
  },
  plugins: [],
};
export default config;
