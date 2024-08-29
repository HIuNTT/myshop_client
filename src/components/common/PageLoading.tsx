import { Spinner } from '@nextui-org/react'

export default function PageLoading() {
  return (
    <div className="flex h-screen items-center justify-center">
      <Spinner size="lg" color="primary" />
    </div>
  )
}
