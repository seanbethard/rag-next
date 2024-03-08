/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        brand: {
          50: '#fff1f1', // Lightest neon, for subtle highlights
          100: '#ffdfdf', // Very light neon, for background accents
          200: '#ffc4c4', // Light neon, for buttons and interactive elements
          300: '#ff9a9a', // Medium neon, for primary UI elements
          400: '#ff6060', // Vibrant neon, the core brand color
          500: '#ff2f2f', // Dark neon, for impactful elements
          600: '#ff2f2f', // Deeper, for hover states or active elements
          700: '#cc0909', // Darker, for strong contrasts
          800: '#cc0909', // Even darker, suitable for text or accents
          900: '#8b1111', // Deepest, for maximum contrast and depth
        },
        offBlack: {
          950: '#121212',
          900: '#0F0F0E',
        },
        neutral: {
          50: '#FAFBFC', // Very light grey
          100: '#F2F3F5',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#B0B8C1', // Medium grey
          500: '#8E99A4', // Neutral color (for text)
          600: '#7C8794', // Slightly darker for subdued text
          700: '#656E7A',
          800: '#4F5966',
          900: '#3B4553', // Dark grey, suitable for contrast text on light backgrounds
          950: '#2C3542', // Very dark grey, for the darkest elements like text on light backgrounds or backgrounds on dark themes
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      fontFamily: {
        sans: ['bricolage grotesque', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
