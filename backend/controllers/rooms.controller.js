const Joi = require('joi');
const Room = require('../models/room.model');
const { asyncHandler } = require('../utils/asyncHandler');

const listSchema = Joi.object({
  search: Joi.string().allow('').optional(),
  category: Joi.string().optional(),
  minPrice: Joi.number().optional(),
  maxPrice: Joi.number().optional(),
  sort: Joi.string().valid('price_asc', 'price_desc', 'rating_desc', 'newest').optional(),
  available: Joi.boolean().optional()
});

const listRooms = asyncHandler(async (req, res) => {
  const { error, value } = listSchema.validate(req.query, { allowUnknown: true });
  if (error) return res.status(400).json({ message: error.message });

  const filter = {};
  if (value.category) filter.category = value.category;

  if (value.minPrice != null || value.maxPrice != null) {
    filter.pricePerNight = {};
    if (value.minPrice != null) filter.pricePerNight.$gte = value.minPrice;
    if (value.maxPrice != null) filter.pricePerNight.$lte = value.maxPrice;
  }

  if (value.search) {
    const q = value.search.trim();
    filter.$or = [
      { title: { $regex: q, $options: 'i' } },
      { description: { $regex: q, $options: 'i' } }
    ];
  }

  // basic sort
  const sort = {};
  if (value.sort === 'price_asc') sort.pricePerNight = 1;
  else if (value.sort === 'price_desc') sort.pricePerNight = -1;
  else if (value.sort === 'newest') sort.createdAt = -1;
  else if (value.sort === 'rating_desc') sort.rating = -1;

  const rooms = await Room.find(filter).sort(sort).limit(50);
  res.json({ rooms });
});

const roomDetails = asyncHandler(async (req, res) => {
  const room = await Room.findById(req.params.id);
  if (!room) return res.status(404).json({ message: 'Room not found' });
  res.json({ room });
});

module.exports = { listRooms, roomDetails };

