import mongoose from 'mongoose'

const roomSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    description: { type: String, required: true },
    imageUrls: [{ type: String }],
    pricePerNight: { type: Number, required: true, min: 0 },
    capacity: { type: Number, default: 2, min: 1 },
    amenities: [{ type: String }],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
)

export default mongoose.model('Room', roomSchema)

