import { HTMLAttributes, ReactNode } from 'react'
import { MenuMode } from './interface'
import MenuContextProvider from './context/MenuContext'
import { cn } from 'utils/cn'
import { isEqual } from 'lodash'
import { LayoutGroup } from 'framer-motion'

export interface MenuProps extends HTMLAttributes<HTMLUListElement> {
  // Level
  inlineIndent?: number

  children?: ReactNode

  // Mode
  mode?: MenuMode

  openKeys?: string[]

  selectedKeys?: string[]

  onOpenChange?: (openKeys: string[]) => void

  // Popup
  subMenuOpenDelay?: number
  subMenuCloseDelay?: number
}

export default function Menu(props: MenuProps) {
  const {
    inlineIndent = 24,
    children,
    mode = 'inline',
    openKeys = [],
    selectedKeys = [],
    onOpenChange,
    subMenuOpenDelay = 0.1,
    subMenuCloseDelay = 0.1,
    className,
  } = props

  const onInternalOpenChange = (key: string, open: boolean) => {
    const newOpenKeys = openKeys.filter((k) => k !== key)

    if (open) {
      newOpenKeys.push(key)
    }

    if (!isEqual(openKeys, newOpenKeys)) {
      onOpenChange?.(newOpenKeys)
    }
  }

  return (
    <MenuContextProvider
      mode={mode}
      openKeys={openKeys}
      selectedKeys={selectedKeys}
      inlineIndent={inlineIndent}
      subMenuOpenDelay={subMenuOpenDelay}
      subMenuCloseDelay={subMenuCloseDelay}
      onOpenChange={onInternalOpenChange}
    >
      <LayoutGroup>
        <ul className={cn('bg-background', className)}>{children}</ul>
      </LayoutGroup>
    </MenuContextProvider>
  )
}
