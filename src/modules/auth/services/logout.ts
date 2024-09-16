/* eslint-disable */

import { request } from 'configs/api'

/** Đăng xuất tài khoản GET /api/v1/account/logout */
export async function logout() {
  return request<any>('/v1/account/logout', {
    method: 'GET',
  })
}
