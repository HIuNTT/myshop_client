import { CSSProperties, HTMLAttributes, ReactNode, useContext } from 'react'
import { cn } from 'utils/cn'
import { MenuContext } from './context/MenuContext'

export interface MenuItemProps extends HTMLAttributes<HTMLLIElement> {
  children?: ReactNode
  level?: number
  eventKey: string
}

export default function MenuItem({ eventKey, children, className, level = 1, onClick, ...restProps }: MenuItemProps) {
  const { inlineIndent, selectedKeys } = useContext(MenuContext)

  const selected = selectedKeys.includes(eventKey)

  const indentStyle: CSSProperties = {
    paddingLeft: `${level * inlineIndent}px`,
  }

  return (
    <li
      className={cn(
        'm-1 flex h-10 cursor-pointer items-center rounded-large pr-4 leading-10 transition-colors hover:bg-black/[.06]',
        selected && 'bg-secondary-50 text-secondary hover:bg-secondary-50',
        className,
      )}
      onClick={onClick}
      {...restProps}
      style={{ ...indentStyle }}
    >
      {children}
    </li>
  )
}
