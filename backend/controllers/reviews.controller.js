const Joi = require('joi');
const Review = require('../models/review.model');
const { asyncHandler } = require('../utils/asyncHandler');

const addReviewSchema = Joi.object({
  rating: Joi.number().min(1).max(5).required(),
  comment: Joi.string().max(2000).allow('').optional(),
  title: Joi.string().max(120).allow('').optional()
});

const addReview = asyncHandler(async (req, res) => {
  const { error, value } = addReviewSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.message });

  const review = await Review.create({
    roomId: req.params.roomId,
    userId: req.user.id,
    rating: value.rating,
    title: value.title || '',
    comment: value.comment || '',
    status: 'PENDING'
  });

  res.status(201).json({ review });
});

const listRoomReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find({ roomId: req.params.roomId, status: 'APPROVED' })
    .sort({ createdAt: -1 })
    .limit(50);

  res.json({ reviews });
});

module.exports = { addReview, listRoomReviews };

