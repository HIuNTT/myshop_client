import { isNumber } from 'lodash'
import { CSSProperties, HTMLAttributes } from 'react'
import { cn } from 'utils/cn'

export interface SiderProps extends HTMLAttributes<HTMLDivElement> {
  collapsed?: boolean
  width?: number | string
  collapsedWidth?: number | string
}

export default function Sider(props: SiderProps) {
  const { className, children, width = 200, collapsedWidth = 80, collapsed = false, ...otherProps } = props

  const rawWidth = collapsed ? collapsedWidth : width
  const siderWidth = isNumber(rawWidth) ? `${rawWidth}px` : String(rawWidth)

  const divStyle: CSSProperties = {
    flex: `0 0 ${siderWidth}`,
    maxWidth: siderWidth,
    minWidth: siderWidth,
    width: siderWidth,
  }

  return (
    <aside
      className={cn('bg-background transition-all duration-[.2s]', className)}
      {...otherProps}
      style={{ ...divStyle }}
    >
      <div className="h-full">{children}</div>
    </aside>
  )
}
