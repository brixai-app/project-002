export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        theme: {
          bg: '#FFFFFF',
          surface: '#FFFFFF',
          'surface-hover': '#FFF8D1',
          border: '#000000',
          primary: '#000000',
          muted: '#3D3D3D',
          accent: '#FF6F00',
          'accent-hover': '#E65F00',
          'accent-text': '#000000',
        },
        bg: '#FFFFFF',
        surface: '#FFFFFF',
        'surface-hover': '#FFF8D1',
        accent: '#FF6F00',
        'accent-hover': '#E65F00',
      },
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        display: ['Manrope', 'sans-serif'],
      },
      borderRadius: {
        theme: '16px',
      },
    },
  },
  plugins: [],
};