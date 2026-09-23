/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        space: {
          950: '#050610',
          900: '#0A0B14',
          850: '#0F1020',
          800: '#141526',
          700: '#1E1F35',
          600: '#2A2B45',
          500: '#3A3B5C',
        },
        impulse: {
          blue: '#3B82F6',
          'blue-bright': '#60A5FA',
          indigo: '#6366F1',
          violet: '#8B5CF6',
          magenta: '#EC4899',
          coral: '#F87171',
          white: '#F8FAFC',
          'gray-light': '#CBD5E1',
        },
      },
      fontFamily: {
        sans: ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      letterSpacing: {
        'ultra-wide': '0.2em',
        'extra-wide': '0.15em',
        'wide-sm': '0.05em',
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'fade-in-delay-1': 'fadeInUp 0.8s ease-out 0.15s forwards',
        'fade-in-delay-2': 'fadeInUp 0.8s ease-out 0.3s forwards',
        'fade-in-delay-3': 'fadeInUp 0.8s ease-out 0.45s forwards',
        'fade-in-delay-4': 'fadeInUp 0.8s ease-out 0.6s forwards',
        'sweep': 'sweep 0.6s ease-out',
        'pulse-slow': 'pulseSlow 4s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'draw-line': 'drawLine 1.5s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        sweep: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        pulseSlow: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        drawLine: {
          '0%': { strokeDashoffset: '1000' },
          '100%': { strokeDashoffset: '0' },
        },
      },
    },
  },
  plugins: [],
};
