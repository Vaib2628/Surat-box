const mongoose = require('mongoose');

const slotSchema = mongoose.Schema(
  {
    turf: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Turf',
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
    },
    isBooked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Slot = mongoose.model('Slot', slotSchema);

module.exports = Slot;