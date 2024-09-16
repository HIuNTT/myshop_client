import { useMutation } from '@tanstack/react-query'
import { request } from 'configs/api'

export interface LoginRequest {
  username: string
  reqPassword: string
}

export interface LoginResponse {
  access_token: string
}

/** Đăng nhập tài khoản POST /api/v1/auth/login */
export async function login(data: LoginRequest) {
  return request<LoginResponse>('/v1/auth/login', {
    method: 'POST',
    data,
    isErrorToast: true,
    showErrorMsg: true,
  })
}

export function useLogin() {
  return useMutation({
    mutationFn: login,
  })
}
