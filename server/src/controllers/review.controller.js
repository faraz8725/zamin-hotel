import Review from '../models/review.model.js'

export async function listReviewsByRoom(req, res) {
  try {
    const { roomId } = req.params
    const reviews = await Review.find({ roomId })
      .sort({ createdAt: -1 })
      .populate('userId', 'name')
    return res.json(reviews)
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Failed to list reviews' })
  }
}

export async function addReview(req, res) {
  try {
    const userId = req.user?.id
    const { roomId } = req.params
    const { rating, comment } = req.body || {}

    if (!rating) return res.status(400).json({ message: 'rating is required' })

    const review = await Review.findOneAndUpdate(
      { roomId, userId },
      { $set: { rating, comment: comment || '' } },
      { upsert: true, new: true },
    )

    return res.status(201).json(review)
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Failed to add review' })
  }
}

