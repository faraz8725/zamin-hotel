import Booking from '../models/booking.model.js'
import Room from '../models/room.model.js'
import User from '../models/user.model.js'

function daysAgo(n) {
  const d = new Date()
  d.setDate(d.getDate() - n)
  return d
}

export async function analytics(req, res) {
  try {
    const totalRooms = await Room.countDocuments({})
    const totalUsers = await User.countDocuments({})
    const totalBookings = await Booking.countDocuments({})

    // last 7 days booking counts
    const last7 = await Promise.all(
      Array.from({ length: 7 }).map(async (_, i) => {
        const start = daysAgo(6 - i)
        const end = daysAgo(5 - i)
        const count = await Booking.countDocuments({ createdAt: { $gte: start, $lt: end } })
        return { date: start.toISOString().slice(0, 10), count }
      }),
    )

    return res.json({
      totalRooms,
      totalUsers,
      totalBookings,
      last7,
    })
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Failed to get analytics' })
  }
}

