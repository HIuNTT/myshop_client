import { HTMLAttributes, ReactNode, useContext } from 'react'
import { MenuContext } from '../context/MenuContext'
import Collapse from 'components/core/animation/Collapse'

export interface SubMenuListProps extends HTMLAttributes<HTMLUListElement> {
  children?: ReactNode
  isOpen?: boolean
}

export default function SubMenuList({ children, isOpen, ...restProps }: SubMenuListProps) {
  const { mode } = useContext(MenuContext)
  return (
    mode === 'inline' && (
      <Collapse isOpen={isOpen} {...restProps}>
        {children}
      </Collapse>
    )
  )
}
