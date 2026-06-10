import mongoose from 'mongoose'

const reviewSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, default: '' },
  },
  { timestamps: true },
)

reviewSchema.index({ roomId: 1, userId: 1 }, { unique: true })

export default mongoose.model('Review', reviewSchema)

