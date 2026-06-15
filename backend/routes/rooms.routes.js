const express = require('express');
const router = express.Router();

const { requireAuth } = require('../middleware/authMiddleware');
const { listRooms, roomDetails } = require('../controllers/rooms.controller');

router.get('/', listRooms);
router.get('/:id', roomDetails);

// Admin actions (stubbed implementation later)
// router.post('/', requireAuth(['admin']), addRoom);

module.exports = router;

