const Joi = require('joi');
const Coupon = require('../models/coupon.model');
const { asyncHandler } = require('../utils/asyncHandler');

const applySchema = Joi.object({
  code: Joi.string().required(),
  amount: Joi.number().min(0).required()
});

const applyCoupon = asyncHandler(async (req, res) => {
  const { error, value } = applySchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.message });

  const coupon = await Coupon.findOne({ code: value.code.toUpperCase(), isActive: true });
  if (!coupon) return res.status(404).json({ message: 'Coupon not found' });

  const now = new Date();
  if (coupon.validFrom && now < coupon.validFrom) return res.status(400).json({ message: 'Coupon not valid yet' });
  if (coupon.validTo && now > coupon.validTo) return res.status(400).json({ message: 'Coupon expired' });

  const discount = Math.round((value.amount * coupon.discountPercent) / 100);
  res.json({ code: coupon.code, discount, afterDiscount: Math.max(0, value.amount - discount) });
});

const listCoupons = asyncHandler(async (_req, res) => {
  const coupons = await Coupon.find({ isActive: true }).sort({ createdAt: -1 }).limit(50);
  res.json({ coupons });
});

module.exports = { applyCoupon, listCoupons };

