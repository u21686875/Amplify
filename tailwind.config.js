module.exports = {
  content: [
    "./frontend/src/**/*.{js,jsx,ts,tsx}",
    "./frontend/components/**/*.{js,jsx,ts,tsx}",
    "./frontend/pages/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-bg': '#000807',
        'sidebar-bg': '#0F0F0F',
        'divider': '#252727',
        green: {
          500: '#1db954',
        }
      },
      backgroundColor: {
        'custom-bg': '#000807',
      },
      fontSize: {
        'featured-title': '29px',
        'featured-artist': '46px',
      },
      spacing: {
        'sidebar': '300px',
      },
      height: {
        'sidebar': '900px',
      }
    }
  },
  plugins: [],
}