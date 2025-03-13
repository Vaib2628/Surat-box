const express = require('express');
const { 
  getAdminProfile, 
  getUsers, 
  getAllBookings, 
  updateBookingStatus,
  getDashboardStats,  // New endpoint
  getMyTurfBookings   // New endpoint
} = require('../controllers/adminController');
const { protect } = require('../middleware/auth');
const { admin } = require('../middleware/admin');

const router = express.Router();

// All routes require admin privileges
router.use(protect);
router.use(admin);

router.get('/profile', getAdminProfile);
router.get('/users', getUsers);
router.get('/bookings', getAllBookings);
router.get('/dashboard', getDashboardStats);  // New route
router.get('/my-bookings', getMyTurfBookings);  // New route
router.put('/bookings/:id', updateBookingStatus);

module.exports = router;