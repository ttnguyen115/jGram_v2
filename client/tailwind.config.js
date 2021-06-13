module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      spacing: {
        '3px': '3px',
        '7px': '7px',
        '70px': '70px',
        '300px': '300px',
        '350px': '350px',
        '400px': '400px',
      },

      gridTemplateColumns: {
        'status': 'repeat(auto-fill, minmax(100px, 1fr))',
        'posts': 'repeat(auto-fill, minmax(300px, 1fr))'
      },
    },

    textColor: theme => ({
      ...theme('colors'),
      'violet': '#3f51b5',
    }),

    backgroundColor: theme => ({
      ...theme('colors'),
      '0008': '#0008',
    }),
    
    minHeight: {
      '70px': '70px',
      '150px': '150px',
    },

    maxHeight: {
      '70px': '70px',
      '100px': '100px',
      '270px': '270px',
    },

    minWidth: {
      '250px': '250px',
      '300px': '300px',
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
      '-1px': '-1px',
      '-2px': '-2px',
      '0': '0',
      '5px': '5px',
      '10px': '10px',
    },

    flex: {
      '01': '01',
      '2': '2 2 0%', 
      '3': '3 3 0%', 
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
  important: true,
}
