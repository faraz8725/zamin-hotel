const Room = require('../models/room.model');
const { asyncHandler } = require('../utils/asyncHandler');

const listAvailability = asyncHandler(async (req, res) => {
  // Calendar availability will be implemented fully later.
  const rooms = await Room.find({ isActive: true }).limit(200);
  res.json({ rooms, note: 'Availability calendar coming in next step' });
});

module.exports = { listAvailability };

