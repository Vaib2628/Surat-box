const Booking = require('../models/Booking');
const Slot = require('../models/Slot');
const Turf = require('../models/Turf');

// @desc    Create a new booking
// @route   POST /api/bookings
// @access  Private
exports.createBooking = async (req, res) => {
  try {
    const { turfId, slotId, bookingDate } = req.body;
    
    // Check if slot exists and is available
    const slot = await Slot.findById(slotId);
    
    if (!slot) {
      return res.status(404).json({
        success: false,
        message: 'Slot not found',
      });
    }
    
    if (slot.isBooked) {
      return res.status(400).json({
        success: false,
        message: 'Slot is already booked',
      });
    }
    
    // Get turf details for pricing
    const turf = await Turf.findById(turfId);
    
    if (!turf) {
      return res.status(404).json({
        success: false,
        message: 'Turf not found',
      });
    }
    
    // Calculate duration in hours
    const startTime = new Date(slot.startTime);
    const endTime = new Date(slot.endTime);
    const durationHours = (endTime - startTime) / (1000 * 60 * 60);
    
    // Calculate amount
    const amount = turf.pricePerHour * durationHours;
    
    // Create booking
    const booking = await Booking.create({
      user: req.user._id,
      turf: turfId,
      slot: slotId,
      bookingDate: new Date(bookingDate),
      amount,
      status: 'confirmed', // Auto-confirm for now, can be changed to 'pending' if payment integration is added later
      paymentStatus: 'completed', // Auto-complete payment for now
    });
    
    // Mark slot as booked
    slot.isBooked = true;
    await slot.save();
    
    res.status(201).json({
      success: true,
      booking,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Get booking by ID
// @route   GET /api/bookings/:id
// @access  Private
exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('turf', 'name location pricePerHour')
      .populate('slot', 'startTime endTime');
    
    // Check if booking exists and belongs to user
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found',
      });
    }
    
    // Allow admin to view any booking, but restrict user to their own bookings
    if (req.user.role !== 'admin' && booking.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized',
      });
    }
    
    res.json({
      success: true,
      booking,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Cancel booking
// @route   PUT /api/bookings/:id/cancel
// @access  Private
exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    
    // Check if booking exists and belongs to user
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found',
      });
    }
    
    // Allow admin to cancel any booking, but restrict user to their own bookings
    if (req.user.role !== 'admin' && booking.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized',
      });
    }
    
    // Check if booking is already cancelled
    if (booking.status === 'cancelled') {
      return res.status(400).json({
        success: false,
        message: 'Booking is already cancelled',
      });
    }
    
    // Update booking status
    booking.status = 'cancelled';
    await booking.save();
    
    // Free up the slot
    const slot = await Slot.findById(booking.slot);
    if (slot) {
      slot.isBooked = false;
      await slot.save();
    }
    
    res.json({
      success: true,
      message: 'Booking cancelled successfully',
      booking,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};