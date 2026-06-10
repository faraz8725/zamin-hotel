import { Router } from 'express'
import { requireAuth } from '../middleware/auth.js'
import { addReview, listReviewsByRoom } from '../controllers/review.controller.js'

const router = Router()

router.get('/:roomId', listReviewsByRoom)
router.post('/:roomId', requireAuth, addReview)

export default router

