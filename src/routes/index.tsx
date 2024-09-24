import { NonIndexRouteObject, useLocation, useNavigate, useRoutes } from 'react-router-dom'
import Cookies from 'js-cookie'
import { RouteList } from './types'
import WrapperRoute from './config'
import AdminLayout from 'components/layout/admin'
import { lazy, useEffect, useState } from 'react'
import HomeLayout from 'components/layout/home'
import { ERole } from 'enums/role.enum'
import AuthLayout from 'components/layout/AuthLayout'
import { authRoute } from 'modules/auth/route'
import { useUser } from 'store/user'
import { useGetUserProfile } from 'modules/user/services/getUserProfile'
import PageLoading from 'components/common/PageLoading'
import { adminRoute } from 'modules/admin/route'

const NotFoundPage = lazy(() => import('modules/error/NotFound'))

function formatRoutes(routes: RouteList): NonIndexRouteObject[] {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return routes.map(({ auth, roles, icon, name, children, ...rest }) => {
    if (rest.element) rest.element = <WrapperRoute element={rest.element} auth={auth} roles={roles} />
    return { ...rest, children: children ? formatRoutes(children) : [] }
  })
}

export default function Routes() {
  const [isLoading, setIsLoading] = useState(true)

  const { token, setUserInfo, clearLogin } = useUser()

  const navigate = useNavigate()
  const { pathname } = useLocation()

  const getUserProfile = useGetUserProfile(!!(token || Cookies.get(import.meta.env.VITE_REFRESH_TOKEN)))

  useEffect(() => {
    if (getUserProfile.data) {
      setUserInfo(getUserProfile.data)
    }
    if (getUserProfile.isError) {
      clearLogin()
    }
  }, [getUserProfile.data, getUserProfile.isError, setUserInfo, clearLogin])

  useEffect(() => {
    if (token && pathname === '/login') {
      navigate({ pathname: '/' }, { replace: true })
    }
  }, [token, navigate, pathname])

  useEffect(() => {
    if (getUserProfile.isSuccess || getUserProfile.isError || !token) {
      setIsLoading(false)
    }
  }, [getUserProfile.isSuccess, getUserProfile.isError, token])

  const element = useRoutes([
    {
      path: '/',
      element: <HomeLayout />,
    },
    {
      path: '/',
      element: <AuthLayout />,
      children: formatRoutes(authRoute),
    },
    {
      path: '/admin',
      element: <WrapperRoute auth={true} roles={[ERole.ADMIN]} element={<AdminLayout />} />,
      children: formatRoutes(adminRoute),
    },
    {
      path: '*',
      element: <NotFoundPage />,
    },
  ])

  if (!isLoading) {
    return element
  }

  return <PageLoading />
}
