const Settings = require('../models/settings.model');
const { asyncHandler } = require('../utils/asyncHandler');

const getSettings = asyncHandler(async (_req, res) => {
  const settings = await Settings.findOne().sort({ createdAt: -1 });
  res.json({ settings: settings || {} });
});

module.exports = { getSettings };

