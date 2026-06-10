import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import AdminRooms from './admin/AdminRooms'

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="" element={<Navigate to="rooms" replace />} />
      <Route path="rooms" element={<AdminRooms />} />
    </Routes>
  )
}

