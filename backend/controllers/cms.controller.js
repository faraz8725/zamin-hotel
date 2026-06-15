const CMS = require('../models/cms.model');
const { asyncHandler } = require('../utils/asyncHandler');

const listCms = asyncHandler(async (_req, res) => {
  const doc = await CMS.findOne().sort({ createdAt: -1 });
  res.json({ cms: doc || {} });
});

module.exports = { listCms };

