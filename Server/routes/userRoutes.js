const express = require('express');
const { getUserProfile, updateUserProfile, getUserBookings } = require('../controllers/userController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);
router.get('/bookings', protect, getUserBookings);

module.exports = router;