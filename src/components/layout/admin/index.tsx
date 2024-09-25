import { Outlet } from 'react-router-dom'
import { adminRoute } from 'modules/admin/route'
import Sider from '../../core/Sider'
import Header from './Header'
import MenuComponent from './Menu'
import { useState } from 'react'
import AdminLogo from './AdminLogo'

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState<boolean>(false)

  const toggle = () => {
    setCollapsed(!collapsed)
  }

  return (
    <div className="flex h-screen">
      <Sider width={220} collapsed={collapsed}>
        <AdminLogo collapsed={collapsed} />
        <MenuComponent items={adminRoute} collapsed={collapsed} />
      </Sider>
      <div className="w-full">
        <Header collapsed={collapsed} toggle={toggle} />
        <Outlet />
      </div>
    </div>
  )
}
