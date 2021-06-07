module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    
    minHeight: {
      '70px': '70px',
    },

    minWidth: {
      '250px': '250px',
    },

    inset: {
      'inherit': 'inherit',
      '5px': '5px',
      '0': '0',
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
