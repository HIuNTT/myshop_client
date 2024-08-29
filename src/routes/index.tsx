import { NonIndexRouteObject, useRoutes } from 'react-router-dom'
import { RouteList } from './types'
import WrapperRoute from './config'
import AdminLayout from 'components/layout/admin'
import { lazy } from 'react'
import HomeLayout from 'components/layout/home'
import { ERole } from 'enums/role.enum'
import AuthLayout from 'components/layout/AuthLayout'

const NotFoundPage = lazy(() => import('modules/error/NotFound'))

function formatRoutes(routes: RouteList): NonIndexRouteObject[] {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return routes.map(({ auth, roles, icon, name, children, ...rest }) => {
    rest.element = <WrapperRoute element={rest.element} auth={auth} roles={roles} />
    return { ...rest, children: children ? formatRoutes(children) : [] }
  })
}

export default function Routes() {
  return useRoutes([
    {
      path: '/admin',
      element: <WrapperRoute auth={true} roles={[ERole.ADMIN]} element={<AdminLayout />} />,
    },
    { path: '/', element: <HomeLayout /> },
    {
      path: '*',
      element: <NotFoundPage />,
    },
    {
      path: '/login',
      element: <AuthLayout />,
    },
  ])
}
