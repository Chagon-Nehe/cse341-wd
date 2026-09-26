const express = require('express');
const router = express.Router();
const { createVenue, getVenues } = require('../controllers/venueController');

router.route('/').get(getVenues).post(createVenue);

module.exports = router;
