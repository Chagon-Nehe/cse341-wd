const Venue = require('../models/Venue');

// @desc    Create a new venue
// @route   POST /api/venues
exports.createVenue = async (req, res) => {
  try {
    const venue = await Venue.create(req.body);
    res.status(201).json({ success: true, data: venue });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Get all venues
// @route   GET /api/venues
exports.getVenues = async (req, res) => {
  try {
    const venues = await Venue.find();
    res.status(200).json({ success: true, count: venues.length, data: venues });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
