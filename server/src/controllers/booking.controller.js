import Booking from '../models/booking.model.js'
import Room from '../models/room.model.js'

function daysBetween(a, b) {
  const ms = new Date(b).getTime() - new Date(a).getTime()
  return Math.max(1, Math.ceil(ms / (1000 * 60 * 60 * 24)))
}

export async function createBooking(req, res) {
  try {
    const userId = req.user?.id
    const { roomId, checkIn, checkOut, guests } = req.body || {}

    if (!userId) return res.status(401).json({ message: 'Unauthorized' })
    if (!roomId || !checkIn || !checkOut) {
      return res.status(400).json({ message: 'roomId, checkIn, checkOut are required' })
    }

    const room = await Room.findById(roomId)
    if (!room) return res.status(404).json({ message: 'Room not found' })

    const nights = daysBetween(checkIn, checkOut)
    const totalPrice = nights * room.pricePerNight

    const booking = await Booking.create({
      userId,
      roomId,
      checkIn: new Date(checkIn),
      checkOut: new Date(checkOut),
      guests: guests ?? 2,
      totalPrice,
      status: 'confirmed',
    })

    return res.status(201).json(booking)
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Failed to create booking' })
  }
}

export async function listMyBookings(req, res) {
  try {
    const userId = req.user?.id
    const bookings = await Booking.find({ userId })
      .sort({ createdAt: -1 })
      .populate('roomId', 'title slug imageUrls pricePerNight capacity')
    return res.json(bookings)
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Failed to list bookings' })
  }
}

export async function listAllBookings(req, res) {
  try {
    const bookings = await Booking.find({})
      .sort({ createdAt: -1 })
      .populate('roomId', 'title slug')
      .populate('userId', 'name email')
    return res.json(bookings)
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Failed to list all bookings' })
  }
}

