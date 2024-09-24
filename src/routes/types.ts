import { ERole } from 'enums/role.enum'
import { NonIndexRouteObject } from 'react-router-dom'

export type RouteList = RouteItem[]

export interface RouteItem extends NonIndexRouteObject {
  path: string
  key?: string
  name?: string
  auth?: boolean
  icon?: string
  roles?: ERole[]
  children?: RouteItem[]
  showOnMenu?: boolean
}
