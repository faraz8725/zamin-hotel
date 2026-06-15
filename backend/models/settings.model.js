const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema(
  {
    hotelName: { type: String, default: 'Zamin Hotel' },
    address: { type: String, default: '' },
    contactNumber: { type: String, default: '' },
    emailAddress: { type: String, default: '' },

    currency: { type: String, default: 'USD' },
    taxPercent: { type: Number, default: 0 },

    bookingRules: { type: Object, default: {} }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Settings', settingsSchema);

