const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true, index: true },
    discountPercent: { type: Number, required: true, min: 1, max: 90 },

    validFrom: { type: Date },
    validTo: { type: Date },

    isActive: { type: Boolean, default: true },

    usageCount: { type: Number, default: 0 }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Coupon', couponSchema);

