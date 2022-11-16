/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'grey-card': 'rgb(249 250 252)',
      },
    },
  },
  plugins: [],
};
