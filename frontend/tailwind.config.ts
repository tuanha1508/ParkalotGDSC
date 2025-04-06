import type { Config } from 'tailwindcss'

export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Varela Round', 'sans-serif'],
        gugi: ['Gugi', 'cursive'],
      },
      fontSize: {
        'xxs': '0.625rem', // 10px
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(var(--tw-gradient-stops))',
      },
      colors: {
        // Core colors used across pages
        black: '#000000',
        white: '#FFFFFF',
        
        // System feedback colors
        green: {
          500: '#10b981',
        },
        red: {
          500: '#ef4444',
        },
        
        // Legacy colors maintained for existing components
        primary: {
          DEFAULT: '#3b82f6',
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554'
        },
        
        // UI and accent colors
        secondary: '#10b981',
        accent: '#8b5cf6',
        warning: '#f59e0b',
        error: '#ef4444',
        surface: '#111827',
        
        // Text colors
        text: {
          primary: '#FFFFFF',
          secondary: '#FFFFFF80', // White with 50% opacity
          muted: '#9ca3af'
        },
        
        // Legacy colors (keeping for backward compatibility)
        whiteText: '#FDFBEE',
        navTitle: '#D8D2C2'
      }
    }
  },
  plugins: []
} satisfies Config 