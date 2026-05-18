/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#1d1d1f',
        ink2: '#424245',
        muted: '#6e6e73',
        muted2: '#86868b',
        line: 'rgba(0,0,0,0.08)',
        line2: 'rgba(0,0,0,0.04)',
        canvas: '#ffffff',
        canvas2: '#fbfbfd',
        canvas3: '#f5f5f7',
        accent: '#0071e3',
        accentHover: '#0077ed',
        ok: '#30d158',
        bad: '#ff453a',
      },
      fontFamily: {
        sans: [
          'var(--font-inter)',
          '-apple-system',
          'BlinkMacSystemFont',
          'SF Pro Display',
          'Segoe UI',
          'sans-serif',
        ],
      },
      letterSpacing: {
        display: '-0.04em',
        tight: '-0.02em',
      },
      keyframes: {
        riseIn: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        modalIn: {
          '0%': { opacity: '0', transform: 'translateY(40px) scale(0.98)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        overlayIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        floatA: {
          '0%, 100%': { transform: 'translate(0,0) scale(1)' },
          '50%': { transform: 'translate(30px,-20px) scale(1.05)' },
        },
        floatB: {
          '0%, 100%': { transform: 'translate(0,0) scale(1)' },
          '50%': { transform: 'translate(-25px,25px) scale(1.08)' },
        },
      },
      animation: {
        riseIn: 'riseIn 0.7s cubic-bezier(0.22, 1, 0.36, 1) both',
        modalIn: 'modalIn 0.5s cubic-bezier(0.22, 1, 0.36, 1) both',
        overlayIn: 'overlayIn 0.3s ease both',
        floatA: 'floatA 14s ease-in-out infinite',
        floatB: 'floatB 18s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
