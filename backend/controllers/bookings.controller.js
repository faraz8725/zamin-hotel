const Joi = require('joi');
const Booking = require('../models/booking.model');
const Room = require('../models/room.model');
const { asyncHandler } = require('../utils/asyncHandler');

const createBookingSchema = Joi.object({
  roomId: Joi.string().required(),
  checkIn: Joi.date().required(),
  checkOut: Joi.date().required(),
  guests: Joi.number().integer().min(1).required(),
  couponCode: Joi.string().allow('').optional()
});

const createBooking = asyncHandler(async (req, res) => {
  const { error, value } = createBookingSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.message });

  const room = await Room.findById(value.roomId);
  if (!room || !room.isActive) return res.status(404).json({ message: 'Room not available' });

  if (new Date(value.checkOut) <= new Date(value.checkIn)) {
    return res.status(400).json({ message: 'Invalid dates' });
  }

  const nights = Math.ceil((new Date(value.checkOut) - new Date(value.checkIn)) / (1000 * 60 * 60 * 24));
  const subtotal = nights * room.pricePerNight;

  const booking = await Booking.create({
    userId: req.user.id,
    roomId: room._id,
    checkIn: value.checkIn,
    checkOut: value.checkOut,
    guests: value.guests,
    subtotal,
    taxAmount: 0,
    totalAmount: subtotal,
    currency: room.currency,
    status: 'PENDING_PAYMENT'
  });

  res.status(201).json({ booking });
});

const listMyBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find({ userId: req.user.id }).sort({ createdAt: -1 }).limit(50);
  res.json({ bookings });
});

module.exports = { createBooking, listMyBookings };

