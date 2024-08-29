import { extendVariants, Input } from '@nextui-org/react'

export const MyInput = extendVariants(Input, {
  variants: {
    // <- modify/add variants
    variant: {
      bordered: {
        inputWrapper: ['border-small', 'border-[#dddde3]', 'data-[hover=true]:border-[#dddde3]'],
      },
    },
    size: {
      xs: {
        inputWrapper: 'h-6 min-h-6 px-1',
        input: 'text-tiny',
      },
      md: {
        inputWrapper: 'h-10 min-h-10',
        input: 'text-small',
      },
      xl: {
        inputWrapper: 'h-14 min-h-14',
        input: 'text-medium',
      },
    },
    textSize: {
      base: {
        input: ['text-base', 'leading-5'],
      },
    },
    removeLabel: {
      true: {
        label: 'hidden',
      },
      false: {},
    },
  },
  defaultVariants: {
    color: 'secondary',
    textSize: 'base',
    removeLabel: true,
    variant: 'bordered',
  },
})
