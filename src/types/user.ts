import { ERole } from 'enums/role.enum'

export interface User {
  username: string
  fullname: string
  email: string
  phone: string
  avatarUrl: string
  role: ERole
  isVerifiedEmail: boolean
  isVefifiedPhone: boolean
}
