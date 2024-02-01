import type { Config } from 'tailwindcss'

export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        gray: {
          500: '#BABDCC',
          900: '#1E1F25'
        },
        purple: {
          500: '#5C3BFF'
        },
        blue: {
          500: '#0274f1',
          600: '#8C66FC'
        },
        'off-black': '#02080d',
        'off-white': '#fafbfb'
      }
    },

    backgroundImage: {
      'blue-gradient': 'linear-gradient(90deg, #8c66fc -29%, #0274f1 145%)',
      'blue-gradient-light': `linear-gradient(0deg, rgba(255, 255, 255, 0.10) 0%, rgba(255, 255, 255, 0.10) 100%), linear-gradient(90deg, #8c66fc -29%, #0274f1 145%)`,
      'orange-gradient':
        'linear-gradient(91deg, #FEDBA8 -3.29%, #CF75D5 106.42%)'
    }
  },
  plugins: []
} satisfies Config
