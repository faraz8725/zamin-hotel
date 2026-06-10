import Room from '../models/room.model.js'

export async function listRooms(req, res) {
  try {
    const { q, minPrice, maxPrice } = req.query

    const filter = { isActive: true }

    if (q) {
      const rx = new RegExp(String(q), 'i')
      filter.$or = [{ title: rx }, { description: rx }, { slug: rx }]
    }

    if (minPrice || maxPrice) {
      filter.pricePerNight = {}
      if (minPrice) filter.pricePerNight.$gte = Number(minPrice)
      if (maxPrice) filter.pricePerNight.$lte = Number(maxPrice)
    }

    const rooms = await Room.find(filter).sort({ pricePerNight: 1 }).limit(50)
    return res.json(rooms)
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Failed to list rooms' })
  }
}

export async function getRoom(req, res) {
  try {
    const { roomId } = req.params
    const room = await Room.findById(roomId)
    if (!room) return res.status(404).json({ message: 'Room not found' })
    return res.json(room)
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Failed to get room' })
  }
}

export async function createRoom(req, res) {
  try {
    const body = req.body || {}
    const { title, slug, description, imageUrls, pricePerNight, capacity, amenities, isActive } = body
    if (!title || !slug || !description || pricePerNight == null) {
      return res.status(400).json({ message: 'title, slug, description, pricePerNight are required' })
    }

    const room = await Room.create({
      title,
      slug,
      description,
      imageUrls: imageUrls || [],
      pricePerNight,
      capacity: capacity ?? 2,
      amenities: amenities || [],
      isActive: isActive ?? true,
    })

    return res.status(201).json(room)
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Failed to create room' })
  }
}

export async function updateRoom(req, res) {
  try {
    const { roomId } = req.params
    const body = req.body || {}

    const updated = await Room.findByIdAndUpdate(roomId, body, { new: true })
    if (!updated) return res.status(404).json({ message: 'Room not found' })
    return res.json(updated)
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Failed to update room' })
  }
}

export async function deleteRoom(req, res) {
  try {
    const { roomId } = req.params
    const deleted = await Room.findByIdAndDelete(roomId)
    if (!deleted) return res.status(404).json({ message: 'Room not found' })
    return res.json({ ok: true })
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Failed to delete room' })
  }
}

