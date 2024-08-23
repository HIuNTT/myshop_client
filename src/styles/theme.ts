import { NextUIPluginConfig, ThemeColors } from '@nextui-org/react'

export const colors: Partial<ThemeColors> = {
  primary: {
    50: '#FEE7EF',
    100: '#FDD0DF',
    200: '#FAA0BF',
    300: '#F871A0',
    400: '#F54180',
    500: '#F31260',
    600: '#C20E4D',
    700: '#920B3A',
    800: '#610726',
    900: '#310413',
    DEFAULT: '#F54180',
  },
}

export const theme: NextUIPluginConfig = {
  themes: {
    light: {
      colors,
    },
  },
}
