const express = require('express');
const router = express.Router();

const { register, login, logout, forgotPassword, resetPassword, getMe } = require('../controllers/auth.controller');
const { requireAuth } = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.post('/logout', requireAuth(), logout);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.get('/me', requireAuth(), getMe);

module.exports = router;

