import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Layout from './components/layout/Layout'
import HomePage from './pages/HomePage'
import RoomsPage from './pages/RoomsPage'
import RoomDetailsPage from './pages/RoomDetailsPage'
import BookingPage from './pages/BookingPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import GalleryPage from './pages/GalleryPage'
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import DashboardPage from './pages/dashboard/DashboardPage'
import AdminRoutes from './routes/AdminRoutes'
import ProtectedRoute from './routes/ProtectedRoute'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/rooms" element={<RoomsPage />} />
        <Route path="/rooms/:roomId" element={<RoomDetailsPage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/gallery" element={<GalleryPage />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        <Route path="/admin/*" element={<AdminRoutes />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <ToastContainer position="bottom-right" newestOnTop />
    </Layout>
  )
}

