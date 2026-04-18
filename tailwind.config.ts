import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        honey: {
          50: '#FFF9EB',
          100: '#FFF0CC',
          200: '#FFE099',
          300: '#FFD066',
          400: '#FFC033',
          500: '#F5A623',
          600: '#D4891A',
          700: '#A66914',
          800: '#7A4D0F',
          900: '#4D300A',
          950: '#2B1A05',
        },
        comb: {
          50: '#FFFDF5',
          100: '#FFF8E1',
          200: '#FFECB3',
          300: '#FFE082',
          400: '#FFD54F',
          500: '#FFC107',
          600: '#FFB300',
          700: '#FFA000',
          800: '#FF8F00',
          900: '#FF6F00',
        },
        hive: {
          50: '#F7F5F0',
          100: '#EDE8DC',
          200: '#DDD4BF',
          300: '#C8BA98',
          400: '#B3A076',
          500: '#9A8558',
          600: '#7D6B46',
          700: '#5F5136',
          800: '#423826',
          900: '#2A2318',
        },
        meadow: {
          50: '#F0F9F0',
          100: '#DCEFDC',
          200: '#B8DFB8',
          300: '#8CCB8C',
          400: '#5FB35F',
          500: '#3D8B3D',
          600: '#2E6B2E',
          700: '#224F22',
          800: '#173517',
          900: '#0E1F0E',
        },
        smoke: {
          50: '#F8F7F6',
          100: '#EEEDEB',
          200: '#DDDBD7',
          300: '#C4C1BB',
          400: '#A9A59D',
          500: '#8E8980',
          600: '#716C65',
          700: '#55524C',
          800: '#3A3834',
          900: '#222120',
        },
      },
      fontFamily: {
        display: ['"DM Serif Display"', 'Georgia', 'serif'],
        body: ['"DM Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'warm': '0 2px 15px -3px rgba(245, 166, 35, 0.15), 0 4px 6px -4px rgba(245, 166, 35, 0.1)',
        'warm-lg': '0 10px 30px -5px rgba(245, 166, 35, 0.2), 0 8px 10px -6px rgba(245, 166, 35, 0.1)',
        'card': '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
        'card-hover': '0 10px 25px -5px rgba(0,0,0,0.08), 0 8px 10px -6px rgba(0,0,0,0.04)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'slide-in-right': 'slideInRight 0.25s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
