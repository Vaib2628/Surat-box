const Admin = require('../models/Admin');
const User = require('../models/User');
const Booking = require('../models/Booking');
const Turf = require('../models/Turf');
const Slot = require('../models/Slot');



// @desc    Get admin profile
// @route   GET /api/admin/profile
// @access  Private/Admin
exports.getAdminProfile = async (req, res) => {
  try {
    // const admin = await Admin.findById(req.user._id).select('-password');
    const admin = await Admin.findById(req.user._id);
    
    
    if (admin) {
      res.json({
        success: true,
        admin,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Admin not found',
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    
    res.json({
      success: true,
      users,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Get all bookings
// @route   GET /api/admin/bookings
// @access  Private/Admin
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({})
      .populate('user', 'name email')
      .populate('turf', 'name location')
      .populate('slot', 'startTime endTime');
    
    res.json({
      success: true,
      bookings,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Update booking status
// @route   PUT /api/admin/bookings/:id
// @access  Private/Admin
exports.updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    const booking = await Booking.findById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found',
      });
    }
    
    booking.status = status;
    
    // If booking is cancelled, free up the slot
    if (status === 'cancelled') {
      const slot = await Slot.findById(booking.slot);
      if (slot) {
        slot.isBooked = false;
        await slot.save();
      }
    }
    
    const updatedBooking = await booking.save();
    
    res.json({
      success: true,
      booking: updatedBooking,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};
// Add dashboard stats method
// @desc    Get admin dashboard stats
// @route   GET /api/admin/dashboard
// @access  Private/Admin
exports.getDashboardStats = async (req, res) => {
  try {
    // Get turfs owned by this admin
    const myTurfs = await Turf.find({ owner: req.user._id });
    const turfIds = myTurfs.map(turf => turf._id);
    
    // Get bookings for admin's turfs
    const bookings = await Booking.find({ turf: { $in: turfIds } });
    
    // Calculate total revenue
    const totalRevenue = bookings.reduce((sum, booking) => {
      if (booking.status !== 'cancelled') {
        return sum + booking.amount;
      }
      return sum;
    }, 0);
    
    // Get booking counts by status
    const confirmedBookings = bookings.filter(b => b.status === 'confirmed').length;
    const pendingBookings = bookings.filter(b => b.status === 'pending').length;
    const cancelledBookings = bookings.filter(b => b.status === 'cancelled').length;
    
    // Get today's bookings
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const todayBookings = await Booking.find({
      turf: { $in: turfIds },
      bookingDate: { $gte: today, $lt: tomorrow }
    }).populate('turf', 'name')
      .populate('slot', 'startTime endTime')
      .populate('user', 'name email phone');
    
    res.json({
      success: true,
      stats: {
        turfCount: myTurfs.length,
        totalRevenue,
        bookingStats: {
          total: bookings.length,
          confirmed: confirmedBookings,
          pending: pendingBookings,
          cancelled: cancelledBookings
        },
        todayBookings
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// Get bookings for admin's turfs
// @desc    Get bookings for admin's turfs
// @route   GET /api/admin/my-bookings
// @access  Private/Admin
exports.getMyTurfBookings = async (req, res) => {
  try {
    // Get turfs owned by this admin
    const myTurfs = await Turf.find({ owner: req.user._id });
    const turfIds = myTurfs.map(turf => turf._id);
    
    // Get all bookings for these turfs
    const bookings = await Booking.find({ turf: { $in: turfIds } })
      .populate('user', 'name email phone')
      .populate('turf', 'name location')
      .populate('slot', 'startTime endTime')
      .sort('-createdAt');
    
    res.json({
      success: true,
      bookings,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};