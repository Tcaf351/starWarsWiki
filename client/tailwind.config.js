module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: ({
        'hero-image': "url('/src/images/starwars1.jpg')",
      }),
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
