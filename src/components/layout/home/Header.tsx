import {
  Avatar,
  Badge,
  Button,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from '@nextui-org/react'
import Logo from 'components/common/Logo'
import { Link, useNavigate } from 'react-router-dom'
import { Icon } from '@iconify/react'
import TextLogo from 'components/common/TextLogo'
import { MyInput } from 'components/common/MyInput'
import { MyButton } from 'components/common/MyButton'
import { useRef } from 'react'
import { useUser } from 'store/user'
import { queryClient } from 'configs/queryClient'
import { profileQueryKey } from 'modules/user/services/getUserProfile'
import { logout } from 'modules/auth/services/logout'

export default function Header() {
  const { user, clearLogin } = useUser()
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  return (
    <Navbar isBlurred={false} isBordered classNames={{ wrapper: 'max-w-[1200px] px-0 sm:gap-12 mx-6 gap-2' }}>
      {/* Header Logo */}
      <NavbarContent className="!flex-grow-0 !basis-auto">
        <NavbarBrand as={Link} to={'/'} className="gap-3">
          <Logo classNames={{ img: 'w-[40px]' }} width={40} radius="none" />
          <TextLogo className="hidden md:flex" width={100} />
        </NavbarBrand>
      </NavbarContent>
      {/* Header search */}
      <NavbarContent className="hidden flex-1 sm:flex">
        <NavbarItem className="w-full">
          <MyInput
            ref={inputRef}
            classNames={{ inputWrapper: 'pr-0' }}
            placeholder="Tìm kiếm sản phẩm, thương hiệu..."
            radius="lg"
            startContent={<Icon icon="octicon:search-24" className="text-foreground-500" width="1.2rem" />}
            endContent={
              <Button
                variant="light"
                color="secondary"
                radius="lg"
                className="relative rounded-l-none text-base data-[pressed=true]:scale-100"
                onPress={() => console.log(inputRef.current?.value)}
              >
                <Divider orientation="vertical" className="absolute left-0 h-3/5 bg-foreground-200" />
                Tìm kiếm
              </Button>
            }
          />
        </NavbarItem>
      </NavbarContent>
      {/* Header cart + user */}
      <NavbarContent className="!flex-grow-0 !basis-auto gap-4">
        {/* Cart */}

        {user.username ? (
          <NavbarItem>
            <Badge size="sm" content="12" shape="circle" color="danger" showOutline={false}>
              <Button isIconOnly variant="light" radius="lg" color="secondary">
                <Icon icon="ph:shopping-cart-simple-bold" width="1.5rem" />
              </Button>
            </Badge>
          </NavbarItem>
        ) : undefined}

        {user.username ? <Divider orientation="vertical" className="ml-2 h-2/5" /> : undefined}
        {/* User ? Account Menu : Login Button */}
        {user.username ? undefined : (
          <NavbarItem>
            <MyButton
              className="hidden min-w-[110px] md:flex"
              onPress={() => navigate('/signup')}
              radius="lg"
              variant="light"
            >
              Đăng ký
            </MyButton>
          </NavbarItem>
        )}
        <NavbarItem>
          {user.username ? (
            <Dropdown
              showArrow
              trigger="longPress"
              placement="bottom-end"
              classNames={{ base: 'before:bg-default-200' }}
            >
              <DropdownTrigger>
                <Avatar
                  size="md"
                  showFallback
                  as="button"
                  src={user.avatarUrl}
                  name={user.username}
                  className="transition-transform"
                  classNames={{ base: 'bg-secondary/30', name: 'text-sm text-bold capitalize' }}
                />
              </DropdownTrigger>
              <DropdownMenu
                classNames={{ list: '[&>li]:px-3 [&>li]:py-2' }}
                itemClasses={{
                  base: [
                    'rounded-md',
                    'text-default-500',
                    'transition-opacity',
                    'data-[hover=true]:text-foreground',
                    'data-[hover=true]:bg-default-100',
                    'dark:data-[hover=true]:bg-default-50',
                    'data-[pressed=true]:opacity-70',
                    'data-[focus-visible=true]:ring-default-500',
                  ],
                }}
              >
                <DropdownItem
                  onPress={() => {
                    navigate('/user/account/profile')
                  }}
                >
                  Thông tin tài khoản
                </DropdownItem>
                <DropdownItem
                  onPress={() => {
                    navigate('/user/purchase')
                  }}
                >
                  Đơn hàng của tôi
                </DropdownItem>
                <DropdownItem
                  onPress={async () => {
                    await logout()
                    clearLogin()
                    queryClient.removeQueries({ queryKey: [profileQueryKey], exact: true })
                  }}
                  className="data-[hover=true]:bg-danger-50 data-[hover=true]:text-danger"
                >
                  Đăng xuất
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <MyButton className="min-w-[110px]" onPress={() => navigate('/login')} radius="lg" variant="light">
              Đăng nhập
            </MyButton>
          )}
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}
