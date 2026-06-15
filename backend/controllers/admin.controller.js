const Booking = require('../models/booking.model');
const Room = require('../models/room.model');
const User = require('../models/user.model');
const { asyncHandler } = require('../utils/asyncHandler');

const analytics = asyncHandler(async (_req, res) => {
  const totalRevenueAgg = await Booking.aggregate([
    { $match: { status: { $in: ['ACCEPTED', 'CHECKED_IN', 'CHECKED_OUT'] }, totalAmount: { $gt: 0 } } },
    { $group: { _id: null, total: { $sum: '$totalAmount' } } }
  ]);

  const totalBookings = await Booking.countDocuments();
  const totalRooms = await Room.countDocuments();
  const activeGuests = await User.countDocuments({ role: 'customer' });

  res.json({
    totalRevenue: totalRevenueAgg[0]?.total || 0,
    totalBookings,
    totalRooms,
    occupancyRate: 0,
    activeGuests,
    monthlyRevenue: [] ,
    recentBookings: [],
    charts: {}
  });
});

module.exports = { analytics };

