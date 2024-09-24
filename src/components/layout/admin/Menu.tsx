import { RouteItem, RouteList } from 'routes/types'
import { Icon } from '@iconify/react'
import { Menu, MenuItem, SubMenu } from 'components/core/menu'
import { useLayoutEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { adminRoute } from 'modules/admin/route'

interface MenuProps {
  items: RouteList
}

export default function MenuComponent({ items }: MenuProps) {
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

  const onOpenChange = (keys: string[]) => {
    setOpenKeys(keys)
  }

  useLayoutEffect(() => {
    const currentPath = adminRoute.find((route) => route.children?.find((child) => child.path === pathname))
    if (!currentPath) {
      const childPath = adminRoute.find((route) => pathname.split('/').slice(2).includes(route.path))
      navigate(childPath?.children?.[0].path || '/admin', { replace: true })
    }

    setSelectedKeys([pathname])
    setOpenKeys([currentPath?.path || pathname])
  }, [pathname, navigate])

  const getTitle = (menu: RouteItem) => {
    return (
      <span className="flex items-center gap-[10px]">
        {menu.icon && <Icon className="min-w-4" width="1em" icon={menu.icon} />}
        <span className="text-small capitalize">{menu.name}</span>
      </span>
    )
  }

  const getMenus = (menuList: RouteList, level = 1) => {
    return menuList
      ?.filter(({ showOnMenu }) => showOnMenu)
      ?.map((menu, idx) => {
        return menu.children ? (
          <SubMenu key={`${level}-${idx}`} eventKey={menu.key || menu.path} level={level} title={getTitle(menu)}>
            {getMenus(menu.children, level + 1)}
          </SubMenu>
        ) : (
          <MenuItem
            key={`${level}-${idx}`}
            eventKey={menu.key || menu.path}
            level={level}
            onClick={() => onMenuClick(menu)}
          >
            {getTitle(menu)}
          </MenuItem>
        )
      })
  }
  return (
    <Menu selectedKeys={selectedKeys} openKeys={openKeys} onOpenChange={onOpenChange}>
      {getMenus(items)}
    </Menu>
  )
}
