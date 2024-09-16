import { useQuery } from '@tanstack/react-query'
import { request } from 'configs/api'
import { User } from 'types/user'

export const profileQueryKey = 'userProfile'

//eslint-disable-next-line
export interface GetUserProfileResponse extends User {}

export async function getUserProfile() {
  return request<GetUserProfileResponse>('/v1/account/profile', {
    method: 'GET',
    isErrorToast: true,
  })
}

export function useGetUserProfile(enabled?: boolean) {
  return useQuery({
    queryKey: [profileQueryKey],
    queryFn: getUserProfile,
    enabled,
  })
}
