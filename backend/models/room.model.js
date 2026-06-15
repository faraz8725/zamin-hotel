const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, index: true },
    category: { type: String, required: true, index: true },

    description: { type: String, default: '' },

    pricePerNight: { type: Number, required: true, min: 0 },
    currency: { type: String, default: 'USD' },

    capacity: { type: Number, required: true, min: 1 },
    amenities: [{ type: String }],

    thumbnailImageUrl: { type: String },
    imageUrls: [{ type: String }],

    rating: { type: Number, default: 0 },

    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Room', roomSchema);

