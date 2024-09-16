import { useMutation } from '@tanstack/react-query'
import { request, RequestOptions } from 'configs/api'

export interface SignupRequest {
  username: string
  fullname: string
  email?: string
  phone: string
  password: string
  confirmedPassword: string
}

export interface SignupResponse {
  access_token: string
}

export async function signup(data: SignupRequest, options?: RequestOptions) {
  //eslint-disable-next-line
  const { confirmedPassword, email, ...rest } = data

  return request<SignupResponse>('/v1/auth/register', {
    method: 'POST',
    data: email ? { ...rest, email } : rest,
    ...(options || {}),
  })
}

export function useSignup() {
  return useMutation({
    mutationFn: signup,
  })
}
