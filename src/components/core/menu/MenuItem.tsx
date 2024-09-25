import { CSSProperties, HTMLAttributes, ReactNode, useContext } from 'react'
import { cn } from 'utils/cn'
import { MenuContext } from './context/MenuContext'

export interface MenuItemProps extends HTMLAttributes<HTMLLIElement> {
  children?: ReactNode
  level?: number
  eventKey: string
}

export default function MenuItem({ eventKey, children, className, level = 1, onClick, ...restProps }: MenuItemProps) {
  const { inlineIndent, selectedKeys, mode } = useContext(MenuContext)

  const selected = selectedKeys.includes(eventKey)

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

  return (
    <li
      className={cn(
        'm-1 flex h-10 cursor-pointer items-center overflow-hidden text-ellipsis whitespace-nowrap rounded-large pe-4 ps-4 leading-10 transition-colors hover:bg-black/[.06]',
        selected && 'bg-secondary-50 text-secondary hover:bg-secondary-50',
        level === 1 && mode !== 'inline' && 'text-clip',
        className,
      )}
      onClick={onClick}
      {...restProps}
      style={{ ...indentStyle, ...paddingInlineStyle }}
    >
      {children}
    </li>
  )
}
