const express = require('express');
const router = express.Router();

const { requireAuth } = require('../middleware/authMiddleware');
const adminController = require('../controllers/admin.controller');

router.get('/analytics', requireAuth(['admin']), adminController.analytics);

module.exports = router;

