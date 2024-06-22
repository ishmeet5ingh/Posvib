/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'black-rgba': 'rgba(0, 0, 0, 0.54)',
      },
      screens: {
        // Custom breakpoint 'xmd' between 'md' and 'lg'
        'p': '1100px',
        'xmd': '900px',
        'xs': '500px',
      },
      height: {
        'screen-minus-68': 'calc(100vh - 68px)',
      },
    },
    
  },
  plugins: [],
}

