/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin')

const backfaceVisibility = plugin(function ({ addUtilities }) {
  addUtilities({
    '.backface-visible': {
      'backface-visibility': 'visible'
    },
    '.backface-hidden': {
      'backface-visibility': 'hidden'
    }
  })
})

export default {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        main: '#f5f5f5',
        secondary: '#fff',
        chatBox: '#f7f7f7',
        hoverMain: '#e2e8f0',
        btnHover: 'hsl(233, 100%, 93%)',
        darkGray: '#343233',
        blackOverlay: 'rgba(0, 0 ,0 ,0.7)',
        feed: '#383838',
        online: '#74be05',
        danger: '#ff0000'
      },
      boxShadow: {
        card: '0 0 128px 0 rgba(0,0,0,0.1), 0 32px 64px -48px rgba(0,0,0,0.5)',
        innerChatBox: 'inset 0 32px 32px -32px rgb(0 0 0 / 8%), inset 0 -32px 32px -32px rgb(0 0 0 / 8%)',
        message: '0 0 32px rgb(0 0 0 / 8%), 0rem 16px 16px -16px rgb(0 0 0 / 10%)'
      },
      margin: {
        320: '320px'
      },

      width: {
        190: '190px',
        275: '275px',
        300: '300px',
        340: '340px',
        350: '350px',
        656: '656px',
        880: '880px',
        508: '508px'
      },
      height: {
        80: '80px',
        340: '340px',
        370: '370px',
        420: '420px',
        510: '510px',
        600: '600px',
        685: '685px',
        800: '800px',
        '90vh': '90vh'
      },
      flex: {
        0.7: '0.7 1 0%'
      },
      maxHeight: {
        370: '370px'
      },
      minWidth: {
        210: '210px',
        350: '350px',
        620: '620px'
      },
      textColor: {
        lightGray: '#F1EFEE',
        primary: '#FAFAFA',
        secColor: '#efefef',
        navColor: '#BEBEBE'
      },
      keyframes: {
        'slide-in': {
          '0%': {
            '-webkit-transform': 'translateX(-200px)',
            transform: 'translateX(-200px)'
          },
          '100%': {
            '-webkit-transform': 'translateX(0px)',
            transform: 'translateX(0px)'
          }
        },

        'slide-fwd': {
          '0%': {
            '-webkit-transform': 'translateZ(0px)',
            transform: 'translateZ(0px)'
          },
          '100%': {
            '-webkit-transform': 'translateZ(160px)',
            transform: 'translateZ(160px)'
          }
        }
      },
      animation: {
        'slide-in': 'slide-in 0.5s ease-out',
        'slide-fwd': ' slide-fwd 0.45s cubic-bezier(0.250, 0.460, 0.450, 0.940) both'
      },
      transitionProperty: {
        height: 'height'
      }
    },
    cursor: {
      'zoom-in': 'zoom-in',
      pointer: 'pointer'
    }
  },
  variants: {
    // backgroundColor: ['active'],
    extend: {}
  },
  plugins: [backfaceVisibility]
}
