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

    maxWidth: {
      '400px': '400px',
      '800px': '800px'
    },

    inset: {
      'inherit': 'inherit',
      '5px': '5px',
      '0': '0',
    },

    flex: {
      '2': '2 2 0%', 
      '3': '3 3 0%', 
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
