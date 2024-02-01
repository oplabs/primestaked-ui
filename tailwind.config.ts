export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        gray: {
          bg1: '#19191d', // Table Header
          bg2: '#141214', // Table body 1
          bg3: '#1e1f25', // Table body 2
          bg4: '#171619', // Table footer
          border: '#282a32', // Table border
          500: '#b5beca' // Gray Text
        },
        blue: {
          500: '#0074f0' // Button
        },
        'off-black': '#101113',
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
}
