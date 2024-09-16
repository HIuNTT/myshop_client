import { useLocation, useNavigate } from 'react-router-dom'
import { WrapperRouteProps } from './config'
import { isEmpty } from 'lodash'
import { ERole } from 'enums/role.enum'
import { Button } from '@nextui-org/react'
import NotFound from 'modules/error/NotFound'
import { useUser } from 'store/user'

export default function PrivateRoute({ roles, ...props }: Omit<WrapperRouteProps, 'auth'>) {
  const { token, user } = useUser()
  const role = user.role || ERole.USER
  const navigate = useNavigate()
  const { pathname } = useLocation()

  if (!isEmpty(roles)) {
    return token && roles?.includes(role) ? props.element || null : <NotFound />
  } else {
    return token ? (
      props.element || null
    ) : (
      <div className="flex h-screen flex-col items-center justify-center">
        <div className="text-center text-xl font-bold">Vui lòng đăng nhập để tiếp tục!</div>
        <div className="mt-8">
          <Button
            className="min-w-80 font-bold"
            color="primary"
            radius="md"
            size="lg"
            onPress={() => navigate({ pathname: '/login' }, { replace: true, state: { from: pathname } })}
          >
            Đăng Nhập
          </Button>
        </div>
      </div>
    )
  }
}
