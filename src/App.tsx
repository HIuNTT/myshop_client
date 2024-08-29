import { NextUIProvider } from '@nextui-org/react'
import PageLoading from 'components/common/PageLoading'
import { Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'
import Routes from 'routes'

export default function App() {
  return (
    <BrowserRouter>
      <NextUIProvider>
        <Suspense fallback={<PageLoading />}>
          <Routes />
        </Suspense>
      </NextUIProvider>
    </BrowserRouter>
  )
}
