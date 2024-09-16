import { Icon } from '@iconify/react'
import { InputProps } from '@nextui-org/react'
import { MyInput } from 'components/common/MyInput'
import { forwardRef, useState } from 'react'
import { cn } from 'utils/cn'

export interface PasswordProps extends Omit<InputProps, 'type'> {
  iconProps?: string
}

const PasswordInput = forwardRef<HTMLInputElement, PasswordProps>(({ iconProps, ...props }, ref) => {
  const [isVisible, setIsVisible] = useState<boolean>(false)

  return (
    <MyInput
      ref={ref}
      endContent={
        <button tabIndex={-1} type="button" onClick={() => setIsVisible(!isVisible)}>
          {isVisible ? (
            <Icon className={cn('pointer-events-none text-xl', iconProps)} icon="mdi:eye" />
          ) : (
            <Icon className={cn('pointer-events-none text-xl', iconProps)} icon="mdi:eye-off" />
          )}
        </button>
      }
      type={isVisible ? 'text' : 'password'}
      {...props}
    />
  )
})

export default PasswordInput
