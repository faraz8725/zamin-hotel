import { Router } from 'express'
import { requireAuth, requireAdmin } from '../middleware/auth.js'
import {
  createBooking,
  listMyBookings,
  listAllBookings,
} from '../controllers/booking.controller.js'

const router = Router()

router.post('/', requireAuth, createBooking)
router.get('/mine', requireAuth, listMyBookings)
router.get('/', requireAuth, requireAdmin, listAllBookings)

export default router

