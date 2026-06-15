const express = require('express');
const router = express.Router();

const { requireAuth } = require('../middleware/authMiddleware');
const { addReview, listRoomReviews } = require('../controllers/reviews.controller');

router.get('/:roomId', listRoomReviews);
router.post('/:roomId', requireAuth(), addReview);

module.exports = router;

