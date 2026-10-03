const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../middleware/auth');
const { createVenue, getVenues, getVenueById, updateVenue, deleteVenue } = require('../controllers/venueController');

router.route('/').get(getVenues).post(ensureAuth, createVenue);

router.route('/:id').get(getVenueById).put(ensureAuth, updateVenue).delete(ensureAuth, deleteVenue);

module.exports = router;