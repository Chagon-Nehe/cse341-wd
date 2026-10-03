const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../middleware/auth');
const {
  createEvent,
  getEvents,
  getEvent,
  updateEvent,
  deleteEvent
} = require('../controllers/eventController');


try {
  router.route('/').get(getEvents).post(ensureAuth, createEvent); // Protected!

  router
      .route('/:id')
      .get(getEvent)
      .put(ensureAuth, updateEvent) // Protected!
      .delete(ensureAuth, deleteEvent); // Protected!
} catch (error) {
  console.error('Error setting up event routes:', error);
  
}
module.exports = router;
