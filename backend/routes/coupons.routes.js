const express = require('express');
const router = express.Router();

const { requireAuth } = require('../middleware/authMiddleware');
const { applyCoupon, listCoupons } = require('../controllers/coupons.controller');

router.post('/apply', requireAuth(), applyCoupon);
router.get('/', listCoupons);

module.exports = router;

