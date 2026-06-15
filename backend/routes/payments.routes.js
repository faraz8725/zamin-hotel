const express = require('express');
const router = express.Router();

const { requireAuth } = require('../middleware/authMiddleware');
const paymentsController = require('../controllers/payments.controller');

router.post('/create-order', requireAuth(), paymentsController.createOrder);
router.post('/verify', requireAuth(), paymentsController.verifyPayment);
router.post('/refund', requireAuth(['admin']), paymentsController.refundPayment);

module.exports = router;

