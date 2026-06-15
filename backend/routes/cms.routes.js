const express = require('express');
const router = express.Router();

const { listCms } = require('../controllers/cms.controller');

router.get('/', listCms);

module.exports = router;

