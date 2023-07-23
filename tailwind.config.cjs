/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  safelist: [
    'ms-0',
    'ms-4',
    'ms-8',
    'ms-12',
    'pb-1',
    'pb-2',
    'pb-4',
    'pb-8',
    'pb-12',
    'pb-16',
    'pt-1',
    'pt-2',
    'pt-4',
    'pt-8',
    'pt-12',
    'pt-16',
  ],
  theme: {
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      grayscale: {
        50: '50%',
      },
      transitionDuration: {
        3000: '3000ms',
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
}