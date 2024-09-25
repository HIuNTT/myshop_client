import { HTMLAttributes, ReactNode, useEffect, useMemo, useState } from 'react'
import { MenuMode } from './interface'
import MenuContextProvider from './context/MenuContext'
import { cn } from 'utils/cn'
import { isEqual } from 'lodash'
import { LayoutGroup } from 'framer-motion'

const EMPTY_LIST: string[] = []

export interface MenuProps extends HTMLAttributes<HTMLUListElement> {
  // Level
  inlineIndent?: number

  children?: ReactNode

  // Mode
  mode?: MenuMode
  inlineCollapsed?: boolean

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
    inlineCollapsed,
    openKeys = [],
    selectedKeys = [],
    onOpenChange,
    subMenuOpenDelay = 0.1,
    subMenuCloseDelay = 0.1,
    className,
  } = props

  const [mergedOpenKeys, setMergedOpenKeys] = useState(openKeys)

  const triggerOpenKeys = (keys: string[]) => {
    setMergedOpenKeys(keys)
    onOpenChange?.(keys)
  }

  const [inlineCacheOpenKeys, setInlineCacheOpenKeys] = useState(mergedOpenKeys)

  const [mergedMode, mergedInlineCollapsed] = useMemo<[MenuMode, boolean]>(() => {
    if ((mode === 'inline' || mode === 'vertical') && inlineCollapsed) {
      return ['vertical', inlineCollapsed]
    }
    return [mode, false]
  }, [mode, inlineCollapsed])

  const isInlineMode = mergedMode === 'inline'

  useEffect(() => {
    setMergedOpenKeys(openKeys)
  }, [openKeys])

  useEffect(() => {
    if (isInlineMode) {
      setMergedOpenKeys(inlineCacheOpenKeys)
    } else {
      triggerOpenKeys(EMPTY_LIST)
    }
    //eslint-disable-next-line
  }, [mergedMode, mergedInlineCollapsed])

  // Cache
  useEffect(() => {
    if (isInlineMode) {
      setInlineCacheOpenKeys(mergedOpenKeys)
    }
  }, [mergedOpenKeys, isInlineMode])

  const onInternalOpenChange = (key: string, open: boolean) => {
    const newOpenKeys = mergedOpenKeys.filter((k) => k !== key)

    if (open) {
      newOpenKeys.push(key)
    }

    if (!isEqual(mergedOpenKeys, newOpenKeys)) {
      triggerOpenKeys(newOpenKeys)
    }
  }

  return (
    <MenuContextProvider
      mode={mergedMode}
      openKeys={mergedOpenKeys}
      selectedKeys={selectedKeys}
      inlineIndent={inlineIndent}
      subMenuOpenDelay={subMenuOpenDelay}
      subMenuCloseDelay={subMenuCloseDelay}
      onOpenChange={onInternalOpenChange}
    >
      <LayoutGroup>
        <ul className={cn('bg-background', className, { 'collapsed w-auto': mergedInlineCollapsed })}>{children}</ul>
      </LayoutGroup>
    </MenuContextProvider>
  )
}
