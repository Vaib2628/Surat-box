const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    turf: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Turf',
    },
    slot: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Slot',
    },
    bookingDate: {
      type: Date,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ['pending', 'confirmed', 'cancelled'],
      default: 'pending',
    },
    paymentStatus: {
      type: String,
      required: true,
      enum: ['pending', 'completed'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;