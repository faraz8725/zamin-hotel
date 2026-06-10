import { Router } from 'express'
import { requireAuth, requireAdmin } from '../middleware/auth.js'
import {
  listRooms,
  getRoom,
  createRoom,
  updateRoom,
  deleteRoom,
} from '../controllers/room.controller.js'

const router = Router()

router.get('/', listRooms)
router.get('/:roomId', getRoom)

router.post('/', requireAuth, requireAdmin, createRoom)
router.patch('/:roomId', requireAuth, requireAdmin, updateRoom)
router.delete('/:roomId', requireAuth, requireAdmin, deleteRoom)

export default router

