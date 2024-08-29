import React from 'react'
import { Outlet } from 'react-router-dom'

export default function AdminLayout() {
  return (
    <div className="h-screen">
      <h1>Admin Layout</h1>
      <Outlet />
    </div>
  )
}
