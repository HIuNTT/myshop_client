import { NextUIProvider } from '@nextui-org/react'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import PageLoading from 'components/common/PageLoading'
import { queryClient } from 'configs/queryClient'
import { Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'
import Routes from 'routes'
import { Toaster } from 'sonner'

export default function App() {
  return (
    <BrowserRouter>
      <NextUIProvider>
        <QueryClientProvider client={queryClient}>
          <Suspense fallback={<PageLoading />}>
            <Routes />
          </Suspense>
          <ReactQueryDevtools position="right" />
          <Toaster richColors />
        </QueryClientProvider>
      </NextUIProvider>
    </BrowserRouter>
  )
}
