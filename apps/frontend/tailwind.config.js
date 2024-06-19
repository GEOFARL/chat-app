import lineClamp from '@tailwindcss/line-clamp';
import scrollBar from 'tailwind-scrollbar';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        grey: {
          DEFAULT: '#586670',
          light: '#d7dfe7',
          '100': '#becbd9',
          '200': '#f8f8f8',
          '300': '#9daab9',
        },
        text: {
          first: '#333333',
          second: '#354149',
          third: '#9aa8b7',
          fourth: '#203245',
          fifth: '#4a4d52',
          sixth: '#3a87ae',
          seventh: '#555555',
          eight: '#777777',
          ninth: '#999999',
        },
        orange: {
          '100': '#f0cbb3',
          '200': '#703a18',
          '300': '#bba08e',
        },
      },
      maxWidth: {
        '7xl': '1300px',
      },
      maxHeight: {
        'screen-minus-header': 'calc(100vh - 64px)',
      },
      minHeight: {
        'screen-minus-header': 'calc(100vh - 64px)',
      },
      boxShadow: {
        '2xl': '4px 4px 10px rgba(0, 0, 0, 0.2)',
      },
    },
    fontFamily: {
      sans: ['"Open Sans"', 'sans-serif'],
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.triangle-left': {
          width: '0',
          height: '0',
          borderTop: '10px solid transparent',
          borderBottom: '10px solid transparent',
          borderRight: '10px solid currentColor',
        },
        '.triangle-right': {
          width: '0',
          height: '0',
          borderTop: '10px solid transparent',
          borderBottom: '10px solid transparent',
          borderLeft: '10px solid currentColor',
        },
      });
    },
    lineClamp,
    scrollBar,
  ],
};
