import { Outlet } from 'react-router-dom'
import Header from './home/Header'

export default function AuthLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <Outlet />
    </div>
  )
}
