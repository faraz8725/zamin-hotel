import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#fff9e6',
          100: '#fff1b8',
          200: '#ffe58a',
          300: '#ffd45c',
          400: '#ffc83a',
          500: '#ffbf1a',
          600: '#e0a300',
          700: '#b98300',
          800: '#8f6700',
          900: '#745500',
        },
      },
      boxShadow: {
        glow: '0 0 22px rgba(255, 191, 26, 0.35)',
      },
      keyframes: {
        floaty: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      animation: {
        floaty: 'floaty 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
} satisfies Config

