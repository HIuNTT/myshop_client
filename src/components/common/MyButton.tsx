import { extendVariants, Button } from '@nextui-org/react'

export const MyButton = extendVariants(Button, {
  variants: {
    // <- modify/add variants
    size: {
      xs: 'px-2 min-w-12 h-6 text-tiny gap-1 rounded-small',
      md: 'px-4 min-w-20 h-10 text-base gap-2',
      xl: 'px-8 min-w-28 h-14 text-large gap-4 rounded-large',
    },
  },
  defaultVariants: {
    // <- modify/add default variants
    size: 'md',
    color: 'secondary',
  },
})
