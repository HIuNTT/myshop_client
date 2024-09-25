import { RouteItem, RouteList } from 'routes/types'
import { Icon } from '@iconify/react'
import { Menu, MenuItem, SubMenu } from 'components/core/menu'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { adminRoute } from 'modules/admin/route'
import SimpleBar from 'simplebar-react'
import { cn } from 'utils/cn'

interface MenuProps {
  items: RouteList
  collapsed?: boolean
}

export default function MenuComponent({ items, collapsed }: MenuProps) {
  const [openKeys, setOpenKeys] = useState<string[]>([])
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])

  const navigate = useNavigate()
  const { pathname } = useLocation()

  const onMenuClick = (menu: RouteItem) => {
    const fullPath = menu.key || menu.path
    if (fullPath === pathname) return
    setSelectedKeys([fullPath])
    navigate(fullPath, { state: { fullPath } })
  }

  useEffect(() => {
    const currentPath = adminRoute.find((route) => route.children?.find((child) => child.path === pathname))
    if (!currentPath) {
      const childPath = adminRoute.find((route) => pathname.split('/').slice(2).includes(route.path))
      navigate(childPath?.children?.[0].path || '/admin', { replace: true })
    }
    setSelectedKeys([pathname])
    setOpenKeys([currentPath?.path || pathname])
  }, [pathname, navigate])

  const getTitle = (menu: RouteItem, level: number) => {
    return (
      <span className="flex min-w-0 flex-auto items-center gap-[10px]">
        {menu.icon && <Icon className="min-w-4" width="1em" icon={menu.icon} />}
        <span
          className={cn('overflow-hidden text-ellipsis text-small capitalize transition-opacity', {
            'opacity-0': level === 1 && collapsed,
          })}
        >
          {menu.name}
        </span>
      </span>
    )
  }

  const getMenus = (menuList: RouteList, level = 1) => {
    return menuList
      ?.filter(({ showOnMenu }) => showOnMenu)
      ?.map((menu, idx) => {
        return menu.children ? (
          <SubMenu key={`${level}-${idx}`} eventKey={menu.key || menu.path} level={level} title={getTitle(menu, level)}>
            {getMenus(menu.children, level + 1)}
          </SubMenu>
        ) : (
          <MenuItem
            key={`${level}-${idx}`}
            eventKey={menu.key || menu.path}
            level={level}
            onClick={() => onMenuClick(menu)}
          >
            {getTitle(menu, level)}
          </MenuItem>
        )
      })
  }
  return (
    <SimpleBar className="h-[calc(100vh-64px)]">
      <Menu selectedKeys={selectedKeys} openKeys={openKeys} inlineCollapsed={collapsed}>
        {getMenus(items)}
      </Menu>
    </SimpleBar>
  )
}
