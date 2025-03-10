const mongoose = require('mongoose');

const turfSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    pricePerHour: {
      type: Number,
      required: true,
    },
    facilities: [String],
    images: [String],
    isActive: {
      type: Boolean,
      default: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Admin'
    }
  },
  {
    timestamps: true,
  }
);

const Turf = mongoose.model('Turf', turfSchema);

module.exports = Turf;