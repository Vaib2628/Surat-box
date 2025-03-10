const express = require('express');
const { 
  createTurf, 
  getTurfs, 
  getTurfById, 
  updateTurf, 
  deleteTurf,
  createSlots,
  getAvailableSlots,
  getMyTurfs  // New endpoint
} = require('../controllers/turfController');
const { protect } = require('../middleware/auth');
const { admin } = require('../middleware/admin');

const router = express.Router();

// Public routes
router.get('/', getTurfs);
router.get('/:id', getTurfById);
router.get('/:id/slots', getAvailableSlots);

// Admin routes
router.post('/', protect, admin, createTurf);
router.get('/admin/my-turfs', protect, admin, getMyTurfs);  // New route
router.put('/:id', protect, admin, updateTurf);
router.delete('/:id', protect, admin, deleteTurf);
router.post('/:id/slots', protect, admin, createSlots);

module.exports = router;