import { request, type RequestOptions } from 'configs/api'

interface RefreshTokenResponse {
  access_token: string
}

/** Tạo mới token POST /v1/auth/refresh-token */
export async function refreshToken(options?: RequestOptions) {
  return request<RefreshTokenResponse>('/v1/auth/refresh-token', {
    method: 'POST',
    ...(options || {}),
  })
}
