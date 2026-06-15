const express = require('express');
const router = express.Router();

const { listAvailability } = require('../controllers/availability.controller');

router.get('/', listAvailability);

module.exports = router;

