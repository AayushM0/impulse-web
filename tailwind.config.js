/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        space: {
          950: '#070B14',
          900: '#0E1626',
          850: '#141D30',
          800: '#1E2A44',
          700: '#2A3B5E',
          600: '#384D7A',
          500: '#4A6296',
        },
        impulse: {
          blue: '#2563EB',
          'blue-bright': '#60A5FA',
          indigo: '#6366F1',
          violet: '#8B5CF6',
          magenta: '#EC4899',
          pink: '#F472B6',
          coral: '#F87171',
          white: '#F2F6FF',
          'gray-light': '#9AA8C2',
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
