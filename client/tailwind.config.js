module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      spacing: {
        '350px': '350px',
        '400px': '400px',
      }
    },

    textColor: {
      'violet': '#3f51b5',
    },

    backgroundColor: theme => ({
      ...theme('colors'),
      '0008': '#0008',
    }),
    
    minHeight: {
      '70px': '70px',
      '150px': '150px',
    },

    minWidth: {
      '250px': '250px',
      '400px': '400px',
    },

    maxWidth: {
      '200px': '200px',
      '400px': '400px',
      '450px': '450px',
      '500px': '500px',
      '800px': '800px'
    },

    inset: {
      'inherit': 'inherit',
      '0': '0',
      '5px': '5px',
      '10px': '10px',
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
