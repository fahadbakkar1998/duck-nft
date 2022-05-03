const { fontFamily } = require('tailwindcss/defaultTheme');
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", './public/index.html'
  ],
  theme: {   
    extend: {      
      colors: {
        screenBlack: '#070707',
      },
      keyframes: {
        zoomIn: {
          '0%': { transform: 'scale(0.0) translateX(-50%) translateY(-50%)' },
          '100%': { transform: 'scale(1.0) translateX(-50%) translateY(-50%)' },
        },
        zoomOut: {
          '0%': { scale: '100%' },
          '100%': { scale: '0%' },
        },
        blink: {
          '0%, 49%': {
            backgroundColor: 'rgba(255, 255, 255, 0)',            
            color: 'white'
          },
          // '%': {
          //   backgroundColor: 'rgba(255, 255, 255, 1)'
          // },
          '50%, 99%': {
            backgroundColor: 'rgba(255, 255, 255, 1)',            
            color: 'black'
          }
        },
        pokeRight: {
          '0%, 100%': {
              transform: 'translateX(-25%)',
              animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)'
          },
          '50%': {
            transform: 'translateY(0)',
            animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)'
          }
        },
        pokeLeft: {
          '0%, 100%': {
              transform: 'translateX(25%)',
              animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)'
          },
          '50%': {
            transform: 'translateY(0)',
            animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)'
          }
        }
      },
      animation: {
        pokeRight: 'pokeRight 1s ease-in-out infinite',
        pokeLeft: 'pokeLeft 1s ease-in-out infinite',     
        blink: 'blink 0.1s linear 3',
        zoomIn: 'zoomIn 0.10s ease-in-out 1',
        zoomOut: 'zoomOut 1s ease-in-out 1'
      },
      fontFamily: {
        primary: ['Inter', ...fontFamily.sans],
      },
    },
  },
  plugins: [],
}
