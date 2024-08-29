import PageLoading from 'components/common/PageLoading'
import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

export default function RouteView() {
  return (
    <Suspense fallback={<PageLoading />}>
      <Outlet />
    </Suspense>
  )
}
