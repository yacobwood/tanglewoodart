import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Museum in the Dark theme colors
        'museum-dark': '#1a1a1d',
        'museum-charcoal': '#2d2d30',
        'museum-slate': '#4e4e50',
        'museum-gold': '#d4af37',
        'museum-gold-light': '#f0d677',
        'museum-cream': '#f5f5dc',
        'spotlight': 'rgba(255, 255, 255, 0.05)',
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
      },
      transitionTimingFunction: {
        'museum': 'cubic-bezier(0.4, 0.0, 0.2, 1)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'spotlight': 'spotlight 0.4s ease-out',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        spotlight: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.03)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      boxShadow: {
        'spotlight': '0 0 60px 30px rgba(212, 175, 55, 0.15)',
        'gold-glow': '0 0 20px rgba(212, 175, 55, 0.3)',
      },
    },
  },
  plugins: [],
}

export default config
