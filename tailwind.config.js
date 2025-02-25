/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#FFFFFF',
        primaryText: '#1F2937',
        secondaryText: '#374151',
        accentAmber: '#F59E0B',
        accentIndigo: '#6366F1',
      },
    },
  },
  plugins: [],
}
