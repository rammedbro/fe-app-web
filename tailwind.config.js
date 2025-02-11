import colors from 'tailwindcss/colors';

/**
 * @type {import('tailwindcss').Config}
 */
export default {
  content: ['./index.html', './src/**/*.{tsx,vue}'],
  darkMode: ['selector', '.dark'],
  theme: {
    fontFamily: {
      logo: ['Titillium Web', 'sans-serif'],
      body: ['Plus Jakarta Sans', 'serif'],
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: {
        DEFAULT: '#F6F7F9',
      },
      primary: {
        DEFAULT: '#3563E9',
        100: '#D6E4FD',
        300: '#85A8F8',
        500: '#3563E9',
        700: '#1A37A7',
        900: '#0A196F',
      },
      content: {
        DEFAULT: '#1A202C',
        100: '#E0E9F4',
        200: '#C3D4E9',
        300: '#90A3BF',
        400: '#596780',
        500: '#1A202C',
        600: '#131825',
        700: '#0D121F',
        800: '#080C19',
        900: '#040815',
      },
      success: {},
      error: colors.red['600'],
      warning: colors.yellow['500'],
      info: {},
    },
    screens: {
      // xs: '320px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    container: {
      padding: {
        DEFAULT: '1rem',
        // sm: '2rem',
        xl: '0rem',
      },
    },
  },
  plugins: [],
};
