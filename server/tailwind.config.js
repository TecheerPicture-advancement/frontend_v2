const { fontFamily } = require('tailwindcss/defaultTheme');
    /** @type {import('tailwindcss').Config} */
    module.exports = {
      content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
      theme: {
        screens: {
          'tablet': '640px',
          'fontSize':'8',
          // => @media (min-width: 640px) { ... }
    
          'laptop': '1024px',
          // => @media (min-width: 1024px) { ... }
    
          'desktop': '1280px',
          // => @media (min-width: 1280px) { ... }
        },
        colors:{
          gray:{
            100:"#D9D9D9",
            200:"#B8B8B8",
            300:"#777777",
            400:"#333333"
          }
        },
        fontSize: {
          xxs: '0.625rem', // 10px
          sm: '0.875rem',
          base: '1rem',
          lg:"1.125rem",
          xl: '1.25rem',
          '2xl': '1.5rem',
          '3xl': '2rem',
          '4xl': '2.25rem',
          '5xl': '2.5rem',
          '6xl': "3rem",
          '7xl': "4.5rem"
        },
        extend: {
          fontFamily: {
            PR_L: ['"Pretendard-Light"', ...fontFamily.sans],
            PR_M: ['"Pretendard-Medium"', ...fontFamily.sans],
            PR_BO: ['"Pretendard-Bold"', ...fontFamily.sans],
            PR_BL: ['"Pretendard-Black"', ...fontFamily.sans],
         },
          colors: {
            white: "#ffffff",
            black: "#111111",
            red:"#ff3939",
            green: {
              "Light":"#e6fbed",
              "Light :hover":"##d9f9e4",
              "Light :active":"#b0f2c7",
              "Normal":"#00d54b",
              "Normal :hover":"#00c044",
              "Normal :active":"#00aa3c",
              "Dark":"#00a038",
              "Dark :hover":"#00802d",
              "Dark :active":"#006022",
              "Darker":"#004b1a"
            },
          },
        },
      },
      plugins: [],
      };