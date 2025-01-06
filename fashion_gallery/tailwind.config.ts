import type { Config } from 'tailwindcss';


const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    
  ],
  theme: {
    extend: {
      colors: {
        paleGold: '#F3D675', // Adding gold color
      },
      keyframes: {
        carouselLeft: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' }
        }
      },
      animation: {
        carouselLeft: 'carouselLeft 30s linear infinite',
      },
      
    },
    
  }
};

export default config;
