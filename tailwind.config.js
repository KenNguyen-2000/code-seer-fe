/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      boxShadow: {
        bottom_shadow:
          'rgba(0, 0, 0, 0.1) 0px 6px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px',
        welcome_btn: '0px 6px 22px rgba(0, 0, 0, 0.1);',
      },
      animation: {
        scaleIn: 'scaleIn 200ms ease-in-out forwards',
        scaleOut: 'scaleOut 200ms ease-in-out forwards',
      },
      keyframes: {
        scaleIn: {
          from: { opacity: 0, transform: 'scale(0.9)' },
          to: { opacity: 1, transform: 'scale(1)' },
        },
        scaleOut: {
          from: {
            opacity: 1,
            transform: 'scale(1)',
          },
          to: {
            opacity: 0,
            transform: 'scale(0.85)',
          },
        },
      },
      colors: {
        navy: '#1C3879',
        beige: '#EAE3D2',
        winter: '#F9F5EB',
        dark_blue: '#162A4B',
        dark_blue_2: '#144272',
        dark_blue_3: '#205295',
        dark_blue_4: '#2C74B3',
        md_blue: '#1E3D59',
        hue_blue: '#48D3F2',
        light_hue_blue: '#3DAEDA',
        primary_blue: '#29678C',

        primary_gray: '#8F8F8F',
        light_gray: '#D8D8D8',

        light_white: '#F3F3F3',

        md_gray: '#4D4D4D',
        primary: '#42526E',
        primary_text: '#212B36',
      },
    },
  },
  plugins: [],
};
