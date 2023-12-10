import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./pages/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    colors: {
      dark: {
        100: '#C1C2C5',
        200: '#A6A7AB',
        300: '#909296',
        400: '#5c5f66',
        500: '#373A40',
        600: '#2C2E33',
        700: '#25262b',
        800: '#1A1B1E',
        900: '#141517'
      },
      gray: {
        100: '#f8f9fa',
        200: '#f1f3f5',
        300: '#e9ecef',
        400: '#dee2e6',
        500: '#ced4da',
        600: '#adb5bd',
        700: '#868e96',
        800: '#495057',
        900: '#343a40'
      },
      red: {
        100: '#fff5f5',
        200: '#ffe3e3',
        300: '#ffc9c9',
        400: '#ffa8a8',
        500: '#ff8787',
        600: '#ff6b6b',
        700: '#fa5252',
        800: '#f03e3e',
        900: '#e03131'
      },
      pink: {
        100: '#fff0f6',
        200: '#ffdeeb',
        300: '#fcc2d7',
        400: '#faa2c1',
        500: '#f783ac',
        600: '#f06595',
        700: '#e64980',
        800: '#d6336c',
        900: '#c2255c'
      },
      grape: {
        100: '#f8f0fc',
        200: '#f3d9fa',
        300: '#eebefa',
        400: '#e599f7',
        500: '#da77f2',
        600: '#cc5de8',
        700: '#be4bdb',
        800: '#ae3ec9',
        900: '#9c36b5'
      },
      violet: {
        100: '#f3f0ff',
        200: '#e5dbff',
        300: '#d0bfff',
        400: '#b197fc',
        500: '#9775fa',
        600: '#845ef7',
        700: '#7950f2',
        800: '#7048e8',
        900: '#6741d9'
      },
      indigo: {
        100: '#edf2ff',
        200: '#dbe4ff',
        300: '#bac8ff',
        400: '#91a7ff',
        500: '#748ffc',
        600: '#5c7cfa',
        700: '#4c6ef5',
        800: '#4263eb',
        900: '#3b5bdb'
      },
      blue: {
        100: '#e7f5ff',
        200: '#d0ebff',
        300: '#a5d8ff',
        400: '#74c0fc',
        500: '#4dabf7',
        600: '#339af0',
        700: '#228be6',
        800: '#1c7ed6',
        900: '#1971c2'
      },
      cyan: {
        100: '#e3fafc',
        200: '#c5f6fa',
        300: '#99e9f2',
        400: '#66d9e8',
        500: '#3bc9db',
        600: '#22b8cf',
        700: '#15aabf',
        800: '#1098ad',
        900: '#0c8599'
      },
      teal: {
        100: '#e6fcf5',
        200: '#c3fae8',
        300: '#96f2d7',
        400: '#63e6be',
        500: '#38d9a9',
        600: '#20c997',
        700: '#12b886',
        800: '#0ca678',
        900: '#099268'
      },
      green: {
        100: '#ebfbee',
        200: '#d3f9d8',
        300: '#b2f2bb',
        400: '#8ce99a',
        500: '#69db7c',
        600: '#51cf66',
        700: '#40c057',
        800: '#37b24d',
        900: '#2f9e44'
      },
      lime: {
        100: '#f4fce3',
        200: '#e9fac8',
        300: '#d8f5a2',
        400: '#c0eb75',
        500: '#a9e34b',
        600: '#94d82d',
        700: '#82c91e',
        800: '#74b816',
        900: '#66a80f'
      },
      yellow: {
        100: '#fff9db',
        200: '#fff3bf',
        300: '#ffec99',
        400: '#ffe066',
        500: '#ffd43b',
        600: '#fcc419',
        700: '#fab005',
        800: '#f59f00',
        900: '#f08c00'
      },
      orange: {
        100: '#fff4e6',
        200: '#ffe8cc',
        300: '#ffd8a8',
        400: '#ffc078',
        500: '#ffa94d',
        600: '#ff922b',
        700: '#fd7e14',
        800: '#f76707',
        900: '#e8590c'
      },
      light: {
        100: '#f8f9fa',
        200: '#f8f9fa',
        300: '#f8f9fa',
        400: '#f8f9fa',
        500: '#f8f9fa',
        600: '#f8f9fa',
        700: '#f8f9fa',
        800: '#f8f9fa',
        900: '#f8f9fa'
      }
    },
    extend: {
      screens: {
        'xl-up': '1280px',
        'lg-up': '1024px',
        'md-up': '768px',
        'sm-up': '640px'
      }
    },
    screens: {
      sz: { max: '320px' },
      // => @media (min-width: 320px) { ... }

      sy: { max: '480px' },
      // => @media (min-width: 320px) { ... }

      sx: { max: '576px' },
      // => @media (min-width: 320px) { ... }

      sm: { max: '640px' },
      // => @media (min-width: 640px) { ... }

      md: { max: '768px' },
      // => @media (min-width: 768px) { ... }

      lg: { max: '1023px' },
      // => @media (min-width: 1024px) { ... }

      xl: { max: '1279px' },
      // => @media (min-width: 1280px) { ... }

      xxl: { max: '1536px' }
      // => @media (min-width: 1536px) { ... }
    }
  },
  plugins: []
};
export default config;
