/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#050505',
        surface: '#0f0f0f',
        border: '#1c1c1c',
        offwhite: '#f0ece4',
        gold: '#c9a84c',
        ok: '#4ade80',
        bad: '#f87171',
      },
      fontFamily: {
        display: ['var(--font-cormorant)', 'serif'],
        mono: ['var(--font-dm-mono)', 'monospace'],
      },
      keyframes: {
        riseIn: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        modalIn: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        overlayIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        riseIn: 'riseIn 0.7s cubic-bezier(0.22, 1, 0.36, 1) both',
        modalIn: 'modalIn 0.45s cubic-bezier(0.22, 1, 0.36, 1) both',
        overlayIn: 'overlayIn 0.3s ease both',
      },
    },
  },
  plugins: [],
};
