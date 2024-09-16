import { InputProps } from '@nextui-org/react'
import { MyInput } from 'components/common/MyInput'
import { Controller, useFormContext } from 'react-hook-form'
import PasswordInput, { PasswordProps } from './PasswordInput'

interface FieldBaseProps {
  t: 'input' | 'hide-input-error' | 'password'
  name: string
}

type FieldProps = FieldBaseProps & (InputProps | PasswordProps)

export default function Field(props: FieldProps) {
  const { name, t } = props
  const { control } = useFormContext()

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { invalid, error } }) => (
        <>
          {t === 'input' && <MyInput {...field} {...props} isInvalid={invalid} errorMessage={error?.message} />}
          {t === 'hide-input-error' && <MyInput {...field} {...props} />}
          {t === 'password' && (
            <PasswordInput {...field} {...props} isInvalid={invalid} errorMessage={error?.message} />
          )}
        </>
      )}
    />
  )
}
