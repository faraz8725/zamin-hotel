const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true, index: true },

    checkIn: { type: Date, required: true, index: true },
    checkOut: { type: Date, required: true, index: true },

    guests: { type: Number, required: true, min: 1 },

    currency: { type: String, default: 'USD' },
    subtotal: { type: Number, default: 0 },
    taxAmount: { type: Number, default: 0 },
    totalAmount: { type: Number, default: 0 },

    couponCode: { type: String },

    status: {
      type: String,
      enum: [
        'PENDING_PAYMENT',
        'ACCEPTED',
        'REJECTED',
        'CHECKED_IN',
        'CHECKED_OUT',
        'CANCELLED',
        'REFUND_REQUESTED',
        'REFUNDED'
      ],
      default: 'PENDING_PAYMENT',
      index: true
    },

    payment: {
      razorpayOrderId: { type: String },
      razorpayPaymentId: { type: String },
      paymentSignature: { type: String },
      method: { type: String },
      paidAt: { type: Date }
    },

    timeline: [
      {
        status: String,
        at: { type: Date, default: Date.now },
        note: String
      }
    ]
  },
  { timestamps: true }
);

bookingSchema.pre('save', function (next) {
  if (this.isNew && (!this.timeline || this.timeline.length === 0)) {
    this.timeline = [{ status: this.status, at: new Date(), note: 'Booking created' }];
  }
  next();
});

module.exports = mongoose.model('Booking', bookingSchema);

