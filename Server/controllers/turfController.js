const Turf = require('../models/Turf');
const Slot = require('../models/Slot');

// @desc    Create a new turf
// @route   POST /api/turfs
// @access  Private/Admin
exports.createTurf = async (req, res) => {
  try {
    const { name, location, description, pricePerHour, facilities, images } = req.body;
    
    const turf = await Turf.create({
      name,
      location,
      description,
      pricePerHour,
      facilities,
      images,
      owner: req.user._id // Set the current admin as the owner
    });
    
    res.status(201).json({
      success: true,
      turf,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Get all turfs
// @route   GET /api/turfs
// @access  Public
exports.getTurfs = async (req, res) => {
  try {
    const turfs = await Turf.find({ isActive: true });
    
    res.json({
      success: true,
      turfs,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Get admin's turfs
// @route   GET /api/turfs/my-turfs
// @access  Private/Admin
exports.getMyTurfs = async (req, res) => {
  try {
    const turfs = await Turf.find({ owner: req.user._id });
    
    res.json({
      success: true,
      turfs,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Get turf by ID
// @route   GET /api/turfs/:id
// @access  Public
exports.getTurfById = async (req, res) => {
  try {
    const turf = await Turf.findById(req.params.id);
    
    if (turf) {
      res.json({
        success: true,
        turf,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Turf not found',
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

// @desc    Update turf
// @route   PUT /api/turfs/:id
// @access  Private/Admin
exports.updateTurf = async (req, res) => {
  try {
    const { name, location, description, pricePerHour, facilities, images, isActive } = req.body;
    
    const turf = await Turf.findById(req.params.id);
    
    if (!turf) {
      return res.status(404).json({
        success: false,
        message: 'Turf not found',
      });
    }
    
    // Check if the admin is the owner of this turf
    if (turf.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized: You can only modify your own turfs',
      });
    }
    
    turf.name = name || turf.name;
    turf.location = location || turf.location;
    turf.description = description || turf.description;
    turf.pricePerHour = pricePerHour || turf.pricePerHour;
    turf.facilities = facilities || turf.facilities;
    turf.images = images || turf.images;
    
    if (isActive !== undefined) {
      turf.isActive = isActive;
    }
    
    const updatedTurf = await turf.save();
    
    res.json({
      success: true,
      turf: updatedTurf,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Delete turf
// @route   DELETE /api/turfs/:id
// @access  Private/Admin
exports.deleteTurf = async (req, res) => {
  try {
    const turf = await Turf.findById(req.params.id);
    
    if (!turf) {
      return res.status(404).json({
        success: false,
        message: 'Turf not found',
      });
    }
    
    // Check if the admin is the owner of this turf
    if (turf.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized: You can only delete your own turfs',
      });
    }
    
    await turf.remove();
    
    res.json({
      success: true,
      message: 'Turf removed',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Create slots for a turf
// @route   POST /api/turfs/:id/slots
// @access  Private/Admin
exports.createSlots = async (req, res) => {
  try {
    const turf = await Turf.findById(req.params.id);
    
    if (!turf) {
      return res.status(404).json({
        success: false,
        message: 'Turf not found',
      });
    }
    
    // Check if the admin is the owner of this turf
    if (turf.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized: You can only create slots for your own turfs',
      });
    }
    
    const { date, startTimes, endTimes } = req.body;
    
    if (startTimes.length !== endTimes.length) {
      return res.status(400).json({
        success: false,
        message: 'Start times and end times must have the same length',
      });
    }
    
    const slots = [];
    
    for (let i = 0; i < startTimes.length; i++) {
      const startTime = new Date(`${date}T${startTimes[i]}`);
      const endTime = new Date(`${date}T${endTimes[i]}`);
      
      const slot = await Slot.create({
        turf: turf._id,
        startTime,
        endTime,
      });
      
      slots.push(slot);
    }
    
    res.status(201).json({
      success: true,
      slots,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
}

exports.getAvailableSlots = async (req, res) => {
  try {
    const { date } = req.query;
    
    if (!date) {
      return res.status(400).json({
        success: false,
        message: 'Date is required',
      });
    }
    
    // Create date range for the selected date (00:00 to 23:59)
    const startDate = new Date(`${date}T00:00:00`);
    const endDate = new Date(`${date}T23:59:59`);
    
    const slots = await Slot.find({
      turf: req.params.id,
      startTime: { $gte: startDate, $lte: endDate },
      isBooked: false,
    }).sort('startTime');
    
    res.json({
      success: true,
      slots,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};