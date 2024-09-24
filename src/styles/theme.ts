import { LayoutTheme, NextUIPluginConfig, ThemeColors } from '@nextui-org/react'

export const colors: Partial<ThemeColors> = {
  primary: {
    100: '#FCDED1',
    200: '#FAB7A5',
    300: '#F18576',
    400: '#E35652',
    500: '#D1202B',
    600: '#B3172F',
    700: '#961030',
    800: '#790A2E',
    900: '#64062D',
    DEFAULT: '#D1202B',
  },
  secondary: {
    50: '#E6F4FF',
    100: '#BAE0FF',
    200: '#91CAFF',
    300: '#69B1FF',
    400: '#4096FF',
    500: '#1677FF',
    600: '#0958D9',
    700: '#003EB3',
    800: '#002C8C',
    900: '#001D66',
    DEFAULT: '#1677FF',
  },
}

const layout: Partial<LayoutTheme> = {
  radius: {
    small: '2px',
    medium: '4px',
    large: '8px',
  },
}

export const theme: NextUIPluginConfig = {
  layout,
  themes: {
    light: {
      colors,
    },
  },
}
