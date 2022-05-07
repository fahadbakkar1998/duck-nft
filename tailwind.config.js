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
        },
        shimmer: {
          '0%, 90%': {
            transform: 'skewX(-10deg) translateX(-100%)',
          },
          '100%': {
            transform: 'skewX(-10deg) translateX(200%)'            
          }
        },
        think: {
          '0%': { opacity: '0%' },
          '5%': { opacity: '100%' },
          '10%': { opacity: '0%' },
          '20%': { opacity: '100%' },
          '30%': { opacity: '50%' },
          '40%': { opacity: '100%' },
          '50%': { opacity: '50%' },
          '60%': { opacity: '10%' },
          '70%': { opacity: '100%' },
          '80%': { opacity: '50%' },
          '90%': { opacity: '50%' },
          '100%': { opacity: '0%' },
        },
      },
      animation: {
        pokeRight: 'pokeRight 1s ease-in-out infinite',
        pokeLeft: 'pokeLeft 1s ease-in-out infinite',     
        blink: 'blink 0.1s linear 3',
        zoomIn: 'zoomIn 0.10s ease-in-out 1',
        zoomOut: 'zoomOut 1s ease-in-out 1',
        shimmer: 'shimmer 8s infinite',
        think: 'think 0.7s infinite',
      },
      fontFamily: {
        primary: ['Inter', ...fontFamily.sans],
      },
    },
  },
  plugins: [],
}
