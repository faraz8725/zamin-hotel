const Gallery = require('../models/gallery.model');
const { asyncHandler } = require('../utils/asyncHandler');

const listGallery = asyncHandler(async (_req, res) => {
  const items = await Gallery.find().sort({ createdAt: -1 }).limit(100);
  res.json({ items });
});

module.exports = { listGallery };

