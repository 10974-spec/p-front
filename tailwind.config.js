// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fefefe',
          100: '#fdfcfb',
          200: '#fbf9f7',
          300: '#f8f5f2',
          400: '#f5f1ec',
          500: '#f2ede6',
          600: '#e0d5cc',
          700: '#b8b0a8',
          800: '#938c85',
          900: '#77716c',
        },
        charcoal: {
          50: '#f7f7f7',
          100: '#e3e3e3',
          200: '#c8c8c8',
          300: '#a4a4a4',
          400: '#818181',
          500: '#666666',
          600: '#515151',
          700: '#434343',
          800: '#383838',
          900: '#1a1a1a',
        },
        accent: {
          50: '#fdf8f3',
          100: '#f7e8d9',
          200: '#efd0b3',
          300: '#e4b182',
          400: '#d68c51',
          500: '#cf7434',
          600: '#c05d2a',
          700: '#9f4825',
          800: '#803a25',
          900: '#673121',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'bounce-soft': 'bounceSoft 0.5s ease-in-out',
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceSoft: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(207, 116, 52, 0.3)' },
          '100%': { boxShadow: '0 0 30px rgba(207, 116, 52, 0.6)' },
        }
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'soft': '0 4px 20px 0 rgba(0, 0, 0, 0.05)',
        'floating': '0 20px 40px rgba(0, 0, 0, 0.1)',
      }
    },
  },
  plugins: [],
}