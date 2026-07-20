import type { Config } from 'tailwindcss';

// Design tokens v2. Moved from texture-based depth (paper grain) to
// elevation-based depth (shadows on white surfaces) — reads as more
// current/premium than the flatter v1 palette. Change a value here, every
// component picks it up automatically since nothing hardcodes hex values.
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0E1116',
        vellum: '#FAF8F3',
        surface: '#FFFFFF',
        'vellum-dark': '#F3F0E8',
        seal: '#8C2F39',
        brass: '#B08D57',
        slate: '#6B7280',
        proceed: '#2F6F4E',
      },
      fontFamily: {
        display: ['Fraunces', 'serif'],
        serif: ['Newsreader', 'serif'],
        sans: ['Inter', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      boxShadow: {
        card: '0 8px 30px rgba(14,17,22,0.06)',
        'card-hover': '0 12px 40px rgba(14,17,22,0.10)',
        cta: '0 8px 24px rgba(140,47,57,0.28)',
      },
    },
  },
  plugins: [],
};
export default config;
