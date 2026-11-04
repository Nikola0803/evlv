const steps = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'];
const scale = (role: string) =>
  Object.fromEntries(steps.map((s) => [s, `oklch(var(--${role}-${s}) / <alpha-value>)`]));

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: scale('background'),
        primary: scale('primary'),
        accent: scale('accent'),
        secondary: scale('secondary'),
        foreground: scale('foreground'),
      },
      fontFamily: {
        sans: ['var(--font-body)'],
        body: ['var(--font-body)'],
        heading: ['var(--font-heading)'],
        display: ['var(--font-heading)'],
        serif: ['var(--font-heading)'],
      },
    },
  },
  plugins: [],
};