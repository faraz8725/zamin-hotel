const Razorpay = require('razorpay');
const crypto = require('crypto');
const Booking = require('../models/booking.model');
const { asyncHandler } = require('../utils/asyncHandler');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

const createOrder = asyncHandler(async (req, res) => {
  const { bookingId } = req.body;
  if (!bookingId) return res.status(400).json({ message: 'bookingId required' });

  const booking = await Booking.findOne({ _id: bookingId, userId: req.user.id });
  if (!booking) return res.status(404).json({ message: 'Booking not found' });

  const amountInPaise = Math.round(booking.totalAmount * 100);

  const order = await razorpay.orders.create({
    amount: amountInPaise,
    currency: booking.currency || 'INR',
    receipt: booking._id.toString(),
    payment_capture: 1
  });

  booking.payment = { ...(booking.payment || {}), razorpayOrderId: order.id };
  booking.status = 'PENDING_PAYMENT';
  await booking.save();

  res.json({ orderId: order.id, amount: amountInPaise, currency: order.currency });
});

const verifyPayment = asyncHandler(async (req, res) => {
  const { bookingId, razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  if (!bookingId || !razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return res.status(400).json({ message: 'Missing payment fields' });
  }

  const booking = await Booking.findById(bookingId);
  if (!booking) return res.status(404).json({ message: 'Booking not found' });

  const expected = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest('hex');

  if (expected !== razorpay_signature) return res.status(400).json({ message: 'Invalid signature' });

  booking.payment.razorpayPaymentId = razorpay_payment_id;
  booking.payment.paymentSignature = razorpay_signature;
  booking.payment.paidAt = new Date();
  booking.status = 'ACCEPTED';
  booking.timeline = booking.timeline || [];
  booking.timeline.push({ status: 'ACCEPTED', at: new Date(), note: 'Payment verified' });
  await booking.save();

  res.json({ message: 'Payment verified', booking });
});

const refundPayment = asyncHandler(async (req, res) => {
  const { bookingId, amount } = req.body;
  if (!bookingId) return res.status(400).json({ message: 'bookingId required' });

  const booking = await Booking.findById(bookingId);
  if (!booking) return res.status(404).json({ message: 'Booking not found' });
  if (!booking.payment?.razorpayPaymentId) return res.status(400).json({ message: 'No payment to refund' });

  const refund = await razorpay.payments.refund(booking.payment.razorpayPaymentId, {
    amount: amount ? Math.round(amount * 100) : undefined
  });

  booking.status = 'REFUNDED';
  booking.timeline = booking.timeline || [];
  booking.timeline.push({ status: 'REFUNDED', at: new Date(), note: 'Refund processed' });
  await booking.save();

  res.json({ refund, booking });
});

module.exports = { createOrder, verifyPayment, refundPayment };

