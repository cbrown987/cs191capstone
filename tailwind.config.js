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
        // Base colors for a clean, modern look
        background: '#FFFFFF',    // or use bg-gray-50 for an off-white
        primaryText: '#1F2937',   // equivalent to text-gray-900 for clear text
        secondaryText: '#374151', // a slightly lighter tone for secondary text

        // Death & Co-inspired accent colors
        accentAmber: '#F59E0B',   // bold amber for interactive elements
        accentIndigo: '#6366F1',  // subtle indigo for hover states or secondary accents
      },
    },
  },
  plugins: [],
}
