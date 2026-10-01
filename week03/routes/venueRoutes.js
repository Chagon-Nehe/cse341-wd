const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../middleware/auth');
const { createVenue, getVenues } = require('../controllers/venueController');

router.route('/').get(getVenues).post(ensureAuth, createVenue);

module.exports = router;