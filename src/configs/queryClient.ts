import { keepPreviousData, QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 2,
      placeholderData: keepPreviousData,
    },
    mutations: {
      onError(error) {
        console.log(error)

        // toast.error(error.response.data.message || error.message)
      },
    },
  },
})
