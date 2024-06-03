/** @type {import('tailwindcss').Config} */
import tailwind_hamburgers from 'tailwind-hamburgers'

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    breakpoints: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px'
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      }
    },
    colors: {
      'black-pearl': '#1D2636',
      'primary': '#EEE7DF',
      'brown': '#2C121B',
      'peach': '#FBD387',
      'orange': '#F26F14',
      'green-soft': '#789678'
    }
  },
  plugins: [tailwind_hamburgers]
}
