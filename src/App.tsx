import { Button, NextUIProvider } from '@nextui-org/react'

export default function App() {
  return (
    <NextUIProvider>
      <Button className="bg-primary-200 text-white">Click me!</Button>
      <div>Hello world!</div>
    </NextUIProvider>
  )
}
