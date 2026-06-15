const mongoose = require('mongoose');

const cmsSchema = new mongoose.Schema(
  {
    hero: { type: Object, default: {} },
    homepage: { type: Object, default: {} },
    about: { type: Object, default: {} },
    hotelInfo: { type: Object, default: {} },
    contact: { type: Object, default: {} },
    faq: [{ question: String, answer: String }],
    footer: { type: Object, default: {} },
    policies: [{ title: String, content: String }],

    social: {
      facebook: String,
      instagram: String,
      twitter: String,
      linkedin: String
    },

    specialOffers: { type: Object, default: {} },

    seo: {
      title: String,
      description: String,
      keywords: [String]
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('CMS', cmsSchema);

