import { ERole } from 'enums/role.enum'
import { PathRouteProps } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'

export interface WrapperRouteProps extends PathRouteProps {
  /** authorization? */
  auth?: boolean

  /** roles? */
  roles?: ERole[]
}

export default function WrapperRoute({ auth, ...props }: WrapperRouteProps) {
  const WitchRoute = auth ? <PrivateRoute {...props} /> : props.element
  return WitchRoute || null
}
