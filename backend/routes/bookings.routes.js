const express = require('express');
const router = express.Router();

const { requireAuth } = require('../middleware/authMiddleware');
const { createBooking, listMyBookings } = require('../controllers/bookings.controller');

router.post('/', requireAuth(), createBooking);
router.get('/me', requireAuth(), listMyBookings);

module.exports = router;

