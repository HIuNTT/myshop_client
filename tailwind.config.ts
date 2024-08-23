import { nextui } from '@nextui-org/react'
import type { Config } from 'tailwindcss'
import { theme } from './src/styles/theme'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    extend: {},
  },
  darkMode: 'class',
  plugins: [nextui(theme)],
} satisfies Config
