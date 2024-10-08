import { CSSProperties, MouseEventHandler, ReactElement, ReactNode, useContext } from 'react'
import { Icon } from '@iconify/react'
import SubMenuList from './SubMenuList'
import { MenuContext } from '../context/MenuContext'
import { cn } from 'utils/cn'

export interface SubMenuProps {
  eventKey: string
  level?: number
  title?: ReactNode
  children?: ReactNode
  style?: CSSProperties
}

export default function SubMenu({ eventKey, children, title, style = {}, level = 1 }: SubMenuProps) {
  const { selectedKeys, inlineIndent, onOpenChange, openKeys, mode } = useContext(MenuContext)

  const originOpen = openKeys.includes(eventKey)

  const childrenSelected = selectedKeys.some((key) => key.includes(eventKey))

  const indentStyle: CSSProperties =
    mode === 'inline'
      ? {
          paddingLeft: `${level * inlineIndent}px`,
        }
      : {}

  const paddingInlineStyle: CSSProperties =
    level === 1 && mode !== 'inline'
      ? {
          paddingInline: 'calc(50% - 12px)',
          transition: 'padding 0.3s cubic-bezier(0.645, 0.045, 0.355, 1)',
        }
      : {}

  const transitionStyle: CSSProperties = {
    transition: 'color 1s , background-color 0.3s cubic-bezier(0.65, 0.05, 0.36, 1)',
  }

  const onInternalTitleClick: MouseEventHandler<HTMLElement> = () => {
    if (mode === 'inline') {
      onOpenChange(eventKey, !originOpen)
    }
  }

  const titleNode: ReactElement = (
    <div
      style={{ ...style, ...indentStyle, ...transitionStyle, ...paddingInlineStyle }}
      className={cn(
        'relative m-1 flex h-10 cursor-pointer items-center overflow-hidden text-ellipsis whitespace-nowrap pr-[34px] leading-10 hover:rounded-large',
        'hover:bg-black/[.06]',
        childrenSelected && 'text-secondary hover:text-foreground',
      )}
      onClick={onInternalTitleClick}
    >
      {title}
      <Icon
        className={cn('absolute right-4', {
          'rotate-180 transform': originOpen,
          hidden: level === 1 && mode !== 'inline',
        })}
        icon="bxs:chevron-down"
      />
    </div>
  )
  return (
    <li className="pb-[0.02px]">
      {titleNode}
      <SubMenuList isOpen={originOpen}>{children}</SubMenuList>
    </li>
  )
}
