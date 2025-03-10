
const express = require('express');
const { 
  createBooking, 
  getBookingById, 
  cancelBooking 
} = require('../controllers/bookingController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// All routes require authentication
router.use(protect);

router.post('/', createBooking);
router.get('/:id', getBookingById);
router.put('/:id/cancel', cancelBooking);

module.exports = router;