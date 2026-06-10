import { Router } from 'express'
import authRoutes from './auth.routes.js'
import roomRoutes from './room.routes.js'
import bookingRoutes from './booking.routes.js'
import reviewRoutes from './review.routes.js'
import adminRoutes from './admin.routes.js'

const router = Router()

router.use('/auth', authRoutes)
router.use('/rooms', roomRoutes)
router.use('/bookings', bookingRoutes)
router.use('/reviews', reviewRoutes)
router.use('/admin', adminRoutes)

export default router

