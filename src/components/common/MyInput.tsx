import { extendVariants, Input } from '@nextui-org/react'

export const MyInput = extendVariants(Input, {
  variants: {
    // <- modify/add variants
    variant: {
      bordered: {
        label: ['text-foreground group-data-[invalid=true]:!text-[#f33a58]'],
        input: ['placeholder:text-default-400'],
        inputWrapper: ['border-small', 'border-[#dddde3]', 'data-[hover=true]:border-[#dddde3]'],
        errorMessage: ['text-[13px] text-[#f33a58]'],
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
        input: ['text-sm', 'leading-5'],
      },
    },
  },
  defaultVariants: {
    color: 'secondary',
    textSize: 'base',
    variant: 'bordered',
  },
})
