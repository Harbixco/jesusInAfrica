/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1.5rem',
        lg: '2rem',
        xl: '2.5rem',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1200px',
        '2xl': '1240px',
      },
    },
    extend: {
      colors: {
        // Exact tokens from jesusinafrica.org
        brand: {
          orange: '#FD9800',
          'orange-hover': '#E98C00',
          navy: '#0F172A',
          slate: '#454F5E',
          cream: '#FEF9E1',
          'soft-cream': '#F9F0C8',
          'dark-brown': '#141006',
          charcoal: '#222222',
        },
      },
      fontFamily: {
        heading: ['Poppins', 'sans-serif'],
        body: ['Montserrat', 'sans-serif'],
      },
      letterSpacing: {
        ast: '2px',
      },
      boxShadow: {
        ast: '0px 0px 4px 0 #00000057',
        card: '0 10px 30px rgba(0,0,0,0.08)',
        dropdown: '0 4px 12px rgba(0,0,0,0.1)',
      },
    },
  },
  plugins: [],
}
