const express = require('express');
const router = express.Router();

const { listGallery } = require('../controllers/gallery.controller');

router.get('/', listGallery);

module.exports = router;

