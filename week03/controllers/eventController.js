const Event = require('../models/Event');

// @desc    Create new event
// @route   POST /api/events
exports.createEvent = async (req, res) => {
  /*  #swagger.tags = ['Events']
        #swagger.summary = 'Create a new campus event with 8 fields'
        #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Event data details',
            required: true,
            schema: { $ref: '#/definitions/EventInput' }
        }
    */
  try {
    const event = await Event.create(req.body);
    res.status(201).json({ success: true, data: event });
  } catch (error) {
    // Check if the error is a Mongoose validation issue
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({ success: false, errors: messages });
    }
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};


// @desc    Get all events (populates venue details)
// @route   GET /api/events
exports.getEvents = async (req, res) => {
  /*  #swagger.tags = ['Events']
        #swagger.summary = 'Retrieve all campus events'
        #swagger.responses = {
            200: {
                description: 'List of all events found',
                schema: [{ $ref: '#/definitions/EventResponse' }]
            }
        }
    */
  try {
    const events = await Event.find().populate('venueId', 'name building');
    res.status(200).json({ success: true, count: events.length, data: events });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Get single event
// @route   GET /api/events/:id
exports.getEvent = async (req, res) => {
  /*  #swagger.tags = ['Events']
        #swagger.summary = 'Fetch a specific event by ID'
    */
  try {
    const event = await Event.findById(req.params.id).populate('venueId');
    if (!event) return res.status(404).json({ success: false, message: 'Event not found' });

    res.status(200).json({ success: true, data: event });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Update event
// @route   PUT /api/events/:id
exports.updateEvent = async (req, res) => {
  /*  #swagger.tags = ['Events']
        #swagger.summary = 'Update an existing event by ID'
        #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Fields to update',
            required: true,
            schema: { $ref: '#/definitions/EventInput' }
        }
    */
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true // Enforces the schema rules on updates
    });

    if (!event) return res.status(404).json({ success: false, message: 'Event not found' });

    res.status(200).json({ success: true, data: event });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({ success: false, errors: messages });
    }
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};


// @desc    Delete event
// @route   DELETE /api/events/:id
exports.deleteEvent = async (req, res) => {
  /*  #swagger.tags = ['Events']
        #swagger.summary = 'Delete an existing event by ID'
    */
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) return res.status(404).json({ success: false, message: 'Event not found' });

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
