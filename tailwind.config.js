import colors from 'tailwindcss/colors';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{tsx,vue}',
  ],
  theme: {
    fontFamily: {
      logo: ['Titillium Web', 'sans-serif'],
      body: ['Source Sans Pro', 'sans-serif'],
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      primary: '#5CB85C',
    },
    screens: {
      xl: '1140px',
    },
  },
  plugins: [],
};

