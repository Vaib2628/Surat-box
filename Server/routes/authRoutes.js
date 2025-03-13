const express = require('express');
const { registerUser, loginUser, registerAdmin } = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const { admin } = require('../middleware/admin');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
// router.post('/admin/register', protect, admin, registerAdmin);
router.post('/admin/register', registerAdmin);

module.exports = router;
