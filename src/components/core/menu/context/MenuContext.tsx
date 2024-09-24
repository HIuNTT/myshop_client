import { createContext, ReactNode } from 'react'
import { MenuMode } from '../interface'

export interface MenuContextProps {
  openKeys: string[]

  mode: MenuMode

  selectedKeys: string[]

  inlineIndent: number

  subMenuOpenDelay: number
  subMenuCloseDelay: number

  onOpenChange: (key: string, open: boolean) => void
}

export const MenuContext = createContext<MenuContextProps>({
  openKeys: [],
  mode: 'inline',
  inlineIndent: 0,
  selectedKeys: [],
  subMenuOpenDelay: 0,
  subMenuCloseDelay: 0,
  onOpenChange: () => {},
})

export default function MenuContextProvider({ children, ...restProps }: MenuContextProps & { children?: ReactNode }) {
  return <MenuContext.Provider value={restProps}>{children}</MenuContext.Provider>
}
