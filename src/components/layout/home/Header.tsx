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
import { MyInput } from 'components/core/field/MyInput'
import { MyButton } from 'components/core/MyButton'
import { useRef } from 'react'

export default function Header() {
  const user = false

  const inputRef = useRef<HTMLInputElement>(null)

  const navigate = useNavigate()

  return (
    <Navbar isBordered classNames={{ wrapper: 'max-w-[1200px] px-0 gap-12 mx-6' }}>
      {/* Header Logo */}
      <NavbarContent className="!flex-grow-0 !basis-auto">
        <NavbarBrand as={Link} to={'/'} className="gap-3">
          <Logo classNames={{ img: 'w-[40px]' }} width={40} radius="none" />
          <TextLogo width={100} />
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
        <NavbarItem>
          <Badge size="sm" content="12" shape="circle" color="danger" showOutline={false}>
            <Button isIconOnly variant="light" radius="lg" color="secondary">
              <Icon icon="ph:shopping-cart-simple-bold" width="1.5rem" />
            </Button>
          </Badge>
        </NavbarItem>
        <Divider orientation="vertical" className="ml-2 h-2/5" />
        {/* User ? Account Menu : Login Button */}
        <NavbarItem>
          {user ? (
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar size="sm" showFallback as="button" src="" className="transition-transform" />
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem>Thông tin tài khoản</DropdownItem>
                <DropdownItem>Đơn hàng của tôi</DropdownItem>
                <DropdownItem>Đăng xuất</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <MyButton onPress={() => navigate('/login')} radius="lg" variant="light">
              Đăng nhập
            </MyButton>
          )}
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}
