import { Router } from 'express'
import { requireAuth, requireAdmin } from '../middleware/auth.js'
import { analytics } from '../controllers/admin.controller.js'

const router = Router()

router.get('/analytics', requireAuth, requireAdmin, analytics)

export default router

