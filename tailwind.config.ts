import type { Config } from 'tailwindcss';

export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',   // Next App Router
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#0F172A',
        muted: '#6B7280',
        bg: '#F7FAFC',
        primary: {
          DEFAULT: '#0C3B5E',
          100: '#E9F2F8',
          600: '#124B77',
        },
        accent: {
          DEFAULT: '#F27920',
          600: '#D76412',
        },
        card: '#FFFFFF',
        success: '#16A34A',
        warning: '#F59E0B',
        danger:  '#DC2626',
      },
      boxShadow: {
        soft: '0 10px 30px -15px rgba(12,59,94,.35)',
      },
      borderRadius: {
        '2xl': '16px',
      },
    },
  },
  plugins: [],
} satisfies Config;
