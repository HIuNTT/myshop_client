import { Icon } from '@iconify/react'
import {
  Avatar,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Navbar,
  NavbarContent,
  NavbarItem,
} from '@nextui-org/react'
import { UNKNOWN_ERROR } from 'configs/api'
import { queryClient } from 'configs/queryClient'
import { logout } from 'modules/auth/services/logout'
import { profileQueryKey } from 'modules/user/services/getUserProfile'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { useUser } from 'store/user'

interface HeaderProps {
  collapsed?: boolean
  toggle: () => void
}

export default function Header({ collapsed, toggle }: HeaderProps) {
  const { user, clearLogin } = useUser()

  const navigate = useNavigate()

  return (
    <Navbar className="bg-white/85" maxWidth="full" isBlurred={false}>
      <NavbarContent justify="start">
        <NavbarItem onClick={toggle} className="cursor-pointer">
          {collapsed ? (
            <Icon width="1.1rem" icon="ant-design:menu-unfold-outlined" />
          ) : (
            <Icon width="1.1rem" icon="ant-design:menu-fold-outlined" />
          )}
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Dropdown placement="bottom-end" className="min-w-max" classNames={{ content: 'p-1' }}>
            <DropdownTrigger>
              <Avatar
                as="button"
                showFallback
                src={user.avatarUrl}
                name={user.username}
                classNames={{ name: 'capitalize text-bold', base: 'bg-primary/20' }}
              />
            </DropdownTrigger>
            <DropdownMenu
              classNames={{ base: 'p-0 w-auto' }}
              itemClasses={{
                base: [
                  'rounded-md',
                  'transition-opacity',
                  'data-[hover=true]:bg-default-100',
                  'dark:data-[hover=true]:bg-default-50',
                  'data-[focus-visible=true]:ring-default-500',
                ],
              }}
            >
              <DropdownSection classNames={{ base: 'mb-0' }}>
                <DropdownItem
                  onPress={() => toast.info('Tính năng sẽ phát triển trong tương lai')}
                  startContent={<Icon icon="uil:setting" />}
                >
                  Cài đặt
                </DropdownItem>
                <DropdownItem className="px-0">
                  <Divider className="bg-default-200" />
                </DropdownItem>
                <DropdownItem
                  onPress={async () => {
                    try {
                      await logout()
                      clearLogin()
                      queryClient.removeQueries({ queryKey: [profileQueryKey], exact: true })
                      navigate('/')
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    } catch (error: any) {
                      toast.error(error.message || UNKNOWN_ERROR)
                    }
                  }}
                  startContent={<Icon icon="material-symbols:logout" />}
                >
                  Đăng xuất
                </DropdownItem>
              </DropdownSection>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}
