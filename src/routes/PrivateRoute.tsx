import { useLocation, useNavigate } from 'react-router-dom'
import { WrapperRouteProps } from './config'
import { isEmpty } from 'lodash'
import { ERole } from 'enums/role.enum'
import { Button } from '@nextui-org/react'
import NotFound from 'modules/error/NotFound'

export default function PrivateRoute({ roles, ...props }: Omit<WrapperRouteProps, 'auth'>) {
  const accessToken = true
  const role = ERole.USER
  const navigate = useNavigate()
  const { pathname } = useLocation()

  if (!isEmpty(roles)) {
    return accessToken && roles?.includes(role) ? props.element || null : <NotFound />
  } else {
    return accessToken ? (
      props.element || null
    ) : (
      <Button
        color="primary"
        onPress={() => navigate({ pathname: 'login' }, { replace: true, state: { from: pathname } })}
      >
        Đăng Nhập
      </Button>
    )
  }
}
