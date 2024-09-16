import { Button, Card, CardBody, CardFooter, CardHeader } from '@nextui-org/react'
import Logo from 'components/common/Logo'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Link as NextLink } from '@nextui-org/react'
import { Icon } from '@iconify/react'
import * as yup from 'yup'
import { FormProvider, useForm } from 'react-hook-form'
import { SignupRequest, useSignup } from '../services/signup'
import { yupResolver } from '@hookform/resolvers/yup'
import Field from 'components/core/field'
import { toast } from 'sonner'
import { useUser } from 'store/user'
import { useGetUserProfile } from 'modules/user/services/getUserProfile'
import { useEffect } from 'react'

const signupSchema = yup.object({
  username: yup.string().required('Vui lòng không bỏ trống'),
  fullname: yup.string().required('Vui lòng không bỏ trống'),
  email: yup.string().optional().email('Vui lòng kiểm tra lại email'),
  phone: yup
    .string()
    .required('Vui lòng không bỏ trống')
    .matches(/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/, 'Số điện thoại không hợp lệ'),
  password: yup
    .string()
    .required('Vui lòng không bỏ trống')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/,
      'Mật khẩu phải có 8-30 ký tự, có ít nhất 1 chữ hoa, 1 chữ thường, 1 số, 1 ký tự đặc biệt',
    ),
  confirmedPassword: yup
    .string()
    .required('Vui lòng không bỏ trống')
    .oneOf([yup.ref('password')], 'Mật khẩu không khớp'),
})

export default function SignupPage() {
  const { setToken, token, setUserInfo } = useUser()

  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state?.from || '/'

  const { mutateAsync, isPending: isPendingRegister } = useSignup()
  const { data, isSuccess } = useGetUserProfile(!!token)

  const methods = useForm<SignupRequest>({
    defaultValues: {
      username: '',
      fullname: '',
      email: '',
      phone: '',
      password: '',
      confirmedPassword: '',
    },
    resolver: yupResolver(signupSchema),
    mode: 'onTouched',
  })

  useEffect(() => {
    if (isSuccess && data) {
      setUserInfo(data)
      toast.success('Đăng ký thành công')
      navigate(from, { replace: true })
    }
  }, [isSuccess, data, navigate, from, setUserInfo])

  const onSubmit = async (data: SignupRequest) => {
    try {
      await mutateAsync(data, {
        onSuccess: (res) => {
          setToken(res.access_token)
        },
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (!error.message.includes(':')) {
        toast.error(error.message)
      } else {
        // Example: error.message = 'username:Tên đăng nhập đã được sử dụng,phone:Số điện thoại đã được sử dụng'
        const errorFields = error.message.split(',')
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        errorFields.forEach((e: any) => {
          const [field, msg] = e.split(':') // Example: e = 'username:Tên đăng nhập đã được sử dụng'
          methods.setError(field, { message: msg })
        })
      }
    }
  }

  return (
    <FormProvider {...methods}>
      <form className="flex justify-center sm:my-4 md:flex-1" onSubmit={methods.handleSubmit(onSubmit)}>
        <Card className="w-full self-center sm:mx-4 md:w-[500px]" classNames={{ base: 'p-5' }}>
          <CardHeader className="flex-col">
            <Logo width="76" radius="full" />
            <div className="mt-1 text-xl font-extrabold">Manta Shop</div>
            <div className="mt-1 text-sm">Đăng ký tài khoản</div>
          </CardHeader>
          <CardBody className="gap-5">
            <Field
              t="input"
              name="username"
              isRequired
              label="Tên đăng nhập"
              labelPlacement="outside"
              placeholder="Nhập tên đăng nhập"
            />
            <Field
              t="input"
              name="fullname"
              isRequired
              label="Họ và tên"
              labelPlacement="outside"
              placeholder="Nhập tên đầy đủ"
            />
            <Field
              t="input"
              name="email"
              label="Email"
              labelPlacement="outside"
              placeholder="Nhập email (không bắt buộc)"
            />
            <Field
              t="input"
              name="phone"
              maxLength={10}
              isRequired
              label="Số điện thoại"
              labelPlacement="outside"
              placeholder="Nhập số điện thoại"
            />
            <Field
              t="password"
              name="password"
              iconProps="text-secondary"
              className="focus:outline-none"
              isRequired
              label="Mật khẩu"
              labelPlacement="outside"
              placeholder="Mật khẩu"
            />
            <Field
              t="password"
              name="confirmedPassword"
              iconProps="text-secondary"
              isRequired
              label="Xác nhận mật khẩu"
              labelPlacement="outside"
              placeholder="Nhập lại mật khẩu"
            />
            <Button isLoading={isPendingRegister} type="submit" className="text-base" color="secondary">
              Đăng ký
            </Button>
            <div className="text-center text-small">
              Bạn đã có tài khoản?{' '}
              <NextLink tabIndex={-1} as={Link} to="/login" className="font-semibold" color="secondary">
                Đăng nhập ngay
              </NextLink>
            </div>
          </CardBody>
          <CardFooter className="flex-col gap-5">
            <div className="flex w-full items-center">
              <div className="flex-grow border-t border-foreground-300"></div>
              <span className="mx-2 text-small font-medium">Hoặc tiếp tục với</span>
              <div className="flex-grow border-t border-foreground-300"></div>
            </div>
            <Button
              size="lg"
              color="secondary"
              className="bg-secondary-200 text-base font-semibold"
              fullWidth
              startContent={<Icon icon="flat-color-icons:google" className="text-3xl" />}
            >
              Tiếp tục với Google
            </Button>
          </CardFooter>
        </Card>
      </form>
    </FormProvider>
  )
}
