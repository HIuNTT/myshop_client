import { Button, Card, CardBody, CardFooter, CardHeader } from '@nextui-org/react'
import Logo from 'components/common/Logo'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Link as NextLink } from '@nextui-org/react'
import { Icon } from '@iconify/react'
import Field from 'components/core/field'
import * as yup from 'yup'
import { FormProvider, useForm } from 'react-hook-form'
import { LoginRequest, useLogin } from '../services/login'
import { yupResolver } from '@hookform/resolvers/yup'
import { useUser } from 'store/user'
import { toast } from 'sonner'
import { useGetUserProfile } from 'modules/user/services/getUserProfile'
import { useEffect } from 'react'

const loginSchema = yup.object({
  username: yup.string().required('Vui lòng không bỏ trống'),
  reqPassword: yup.string().required('Vui lòng không bỏ trống'),
})

export default function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state?.from || '/'

  const user = useUser()

  const { mutateAsync, isPending: isPendingLogin } = useLogin()
  const { data, isSuccess } = useGetUserProfile(!!user.token)

  const methods = useForm<LoginRequest>({
    defaultValues: {
      username: '',
      reqPassword: '',
    },
    resolver: yupResolver(loginSchema),
    mode: 'onSubmit',
  })

  useEffect(() => {
    if (isSuccess && data) {
      user.setUserInfo(data)
      toast.success('Đăng nhập thành công')
      navigate(from, { replace: true })
    }
  }, [isSuccess, data, navigate, from, user])

  const onSubmit = async (body: LoginRequest) => {
    await mutateAsync(body, {
      onSuccess: (res) => {
        user.setToken(res.access_token)
      },
    })
  }

  return (
    <FormProvider {...methods}>
      <form className="flex justify-center md:flex-1" onSubmit={methods.handleSubmit(onSubmit)}>
        <Card className="w-full self-center sm:mx-4 md:w-[500px]" classNames={{ base: 'p-5' }}>
          <CardHeader className="flex-col">
            <Logo width="76" radius="full" />
            <div className="mt-1 text-xl font-extrabold">Manta Shop</div>
            <div className="mt-1 text-sm">Đăng nhập tài khoản</div>
          </CardHeader>
          <CardBody className="gap-5">
            <Field
              t="input"
              name="username"
              label="Tên đăng nhập"
              labelPlacement="outside"
              placeholder="Tên đăng nhập, số điện thoại, email"
            />
            <Field
              t="password"
              iconProps="text-secondary"
              name="reqPassword"
              label="Mật khẩu"
              labelPlacement="outside"
              placeholder="Mật khẩu"
            />
            <NextLink tabIndex={-1} color="foreground" as={Link} to="/" size="sm" className="justify-end">
              Quên mật khẩu?
            </NextLink>
            <Button isLoading={isPendingLogin} type="submit" className="text-base" color="secondary">
              Đăng nhập
            </Button>
            <div className="text-center text-small">
              Bạn chưa có tài khoản?{' '}
              <NextLink tabIndex={-1} as={Link} to="/signup" className="font-semibold" color="secondary">
                Đăng ký ngay
              </NextLink>
            </div>
          </CardBody>
          <CardFooter className="flex-col gap-5">
            <div className="flex w-full items-center">
              <div className="flex-grow border-t border-foreground-400"></div>
              <span className="mx-2 text-small font-medium">Hoặc tiếp tục với</span>
              <div className="flex-grow border-t border-foreground-400"></div>
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
