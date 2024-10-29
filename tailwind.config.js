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
      },
      backgroundImage: {
        'radial-gradient': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { opacity: 0.5 },
          '100%': { opacity: 0.8 },
        },
      },
    }
  },
  plugins: [],
}