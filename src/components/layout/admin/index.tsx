import { Outlet } from 'react-router-dom'
import { adminRoute } from 'modules/admin/route'
import Sider from '../../core/Sider'
import Header from './Header'
import Logo from 'components/common/Logo'
import MenuComponent from './Menu'

export default function AdminLayout() {
  return (
    <div className="flex h-screen">
      <Sider width={220}>
        <div className="flex h-16 items-center pl-6">
          <Logo radius="full" width={32} />
          <h2 className="ml-2 text-xl font-semibold text-[#6A45FF]">Manta Shop</h2>
        </div>
        <MenuComponent items={adminRoute} />
      </Sider>
      <div className="w-full">
        <Header />
        <Outlet />
      </div>
    </div>
  )
}
