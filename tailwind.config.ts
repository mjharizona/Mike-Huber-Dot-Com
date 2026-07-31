import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50:  '#f0f4fa',
          100: '#dce6f3',
          200: '#b9cce7',
          300: '#8aabd5',
          400: '#5a85bf',
          500: '#3a66a8',
          600: '#2b508d',
          700: '#1e3a6e',
          800: '#16285a',
          900: '#0f1d44',
          950: '#080f26',
        },
        gold: {
          400: '#f5c842',
          500: '#e6b422',
          600: '#c89a10',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-merriweather)', 'Georgia', 'serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '72ch',
            color: '#374151',
            h1: { color: '#0f1d44', fontFamily: 'var(--font-merriweather)' },
            h2: { color: '#0f1d44', fontFamily: 'var(--font-merriweather)' },
            h3: { color: '#1e3a6e', fontFamily: 'var(--font-merriweather)' },
            a: { color: '#2b508d', textDecoration: 'underline' },
            strong: { color: '#0f1d44' },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

export default config
