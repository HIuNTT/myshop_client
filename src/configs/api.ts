/* eslint-disable @typescript-eslint/no-explicit-any */

import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, HttpStatusCode } from 'axios'
import { isString } from 'lodash'
import { refreshToken } from 'modules/auth/services/refreshToken'
import { toast } from 'sonner'
import { useUser } from 'store/user'

const UNKNOWN_ERROR = 'Lỗi không xác định, vui lòng thử lại'

export type BaseResponse<T = any> = {
  statusCode: number
  message: string
  data: T
}

export interface RequestOptions extends AxiosRequestConfig {
  isReturnData?: boolean
  successMsg?: string
  errorMsg?: string
  showSuccessMsg?: boolean
  showErrorMsg?: boolean
  isErrorToast?: boolean
}

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
})

api.interceptors.request.use(
  (config) => {
    const { token } = useUser.getState()
    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

api.interceptors.response.use(
  (response: AxiosResponse<BaseResponse>) => response,
  async (error: AxiosError) => {
    const config = error.config
    console.log(config?.url)

    if (error.response?.status === HttpStatusCode.Unauthorized && config?.url !== '/v1/auth/refresh-token') {
      try {
        const data = await refreshToken()
        if (data) {
          useUser.getState().setToken(data.access_token)
          return api(config!)
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        toast.error('Phiên đăng nhập hết hạn, vui lòng đăng nhập lại')
        useUser.getState().clearLogin()
      }
    }
    return Promise.reject(error)
  },
)

export function request<T = any>(
  url: string,
  config: { isReturnData: false } & RequestOptions,
): Promise<BaseResponse<T>>

export function request<T = any>(url: string, config: RequestOptions): Promise<BaseResponse<T>['data']>

export function request<T = any>(config: { isReturnData: false } & RequestOptions): Promise<BaseResponse<T>>

export function request<T = any>(config: RequestOptions): Promise<BaseResponse<T>['data']>

/**
 *
 * @param url - request url
 * @param config - AxiosRequestConfig
 */
export async function request(_url: string | RequestOptions, _config: RequestOptions = {}) {
  const url = isString(_url) ? _url : _url.url
  const config = isString(_url) ? _config : _url
  try {
    const { isReturnData = true, ...rest } = config

    const response = (await api.request({ url, ...rest })) as AxiosResponse<BaseResponse>
    const { data } = response
    const { statusCode, message } = data || {}

    const hasSuccess = data && Reflect.has(data, 'statusCode') && statusCode === HttpStatusCode.Ok

    if (hasSuccess) {
      const { successMsg, showSuccessMsg } = config
      if (successMsg) {
        toast.success(successMsg)
      } else if (showSuccessMsg && message) {
        toast.success(message)
      }
    }

    if (!isReturnData) {
      return data
    } else {
      return data.data
    }
  } catch (error: any) {
    const { errorMsg, showErrorMsg, isErrorToast = false } = config
    const errMsg = error?.response?.data?.message ?? UNKNOWN_ERROR

    if (errorMsg) {
      error.message = errorMsg
      if (isErrorToast) toast.error(errorMsg)
    } else if (showErrorMsg) {
      error.message = errMsg
      if (isErrorToast) toast.error(errMsg)
    }

    error.message = errMsg

    return Promise.reject(error)
  }
}
