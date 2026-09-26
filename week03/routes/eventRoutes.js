const express = require('express');
const router = express.Router();
const {
  createEvent,
  getEvents,
  getEvent,
  updateEvent,
  deleteEvent
} = require('../controllers/eventController');

router.route('/').get(getEvents).post(createEvent);

router.route('/:id').get(getEvent).put(updateEvent).delete(deleteEvent);

module.exports = router;

