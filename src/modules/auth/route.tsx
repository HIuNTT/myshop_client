import { RouteList } from 'routes/types'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'

export const authRoute: RouteList = [
  {
    path: 'login',
    element: <LoginPage />,
  },
  {
    path: 'signup',
    element: <SignupPage />,
  },
]
