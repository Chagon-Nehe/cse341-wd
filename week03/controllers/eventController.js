const Event = require('../models/Event');

// @desc    Create new event
// @route   POST /api/events
exports.createEvent = async (req, res) => {
  /*   #swagger.tags = ['Events']
        #swagger.summary = 'Create a new campus event'
        #swagger.security = [{ "googleOAuth": ["profile", "email"] }] 
        #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Event data details',
            required: true,
            schema: { $ref: '#/definitions/EventInput' }
        }
        #swagger.responses[201] = {
            description: 'Event created successfully',
            schema: { $ref: '#/definitions/EventResponse' }
        }
        #swagger.responses[400] = { description: 'Validation error' }
        #swagger.responses[500] = { description: 'Server Error' }
  */
  try {
    const event = await Event.create(req.body);
    res.status(201).json({ success: true, data: event });
  } catch (error) {
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
        #swagger.responses[200] = {
            description: 'List of all events found',
            schema: [{ $ref: '#/definitions/EventResponse' }]
        }
        #swagger.responses[500] = { description: 'Server Error' }
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
        #swagger.summary = 'Retrieve a single event by its ID'
        #swagger.parameters['id'] = {
            in: 'path',
            description: 'Event ID',
            required: true,
            type: 'string'
        }
        #swagger.responses[200] = {
            description: 'Event found successfully',
            schema: { $ref: '#/definitions/EventResponse' }
        }
        #swagger.responses[404] = { description: 'Event not found' }
        #swagger.responses[400] = { description: 'Invalid ID format / Bad request' }
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
        #swagger.security = [{ "googleOAuth": ["profile", "email"] }] 
        #swagger.parameters['id'] = {
            in: 'path',
            description: 'Event ID',
            required: true,
            type: 'string'
        }
        #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Fields to update',
            required: true,
            schema: { $ref: '#/definitions/EventInput' }
        }
        #swagger.responses[200] = {
            description: 'Event updated successfully',
            schema: { $ref: '#/definitions/EventResponse' }
        }
        #swagger.responses[400] = { description: 'Validation error' }
        #swagger.responses[404] = { description: 'Event not found' }
        #swagger.responses[500] = { description: 'Server Error' }
  */
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true // Enforces schema rules on updates
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
        #swagger.security = [{ "googleOAuth": ["profile", "email"] }] 
        #swagger.parameters['id'] = {
            in: 'path',
            description: 'Event ID',
            required: true,
            type: 'string'
        }
        #swagger.responses[200] = { description: 'Event deleted successfully' }
        #swagger.responses[404] = { description: 'Event not found' }
        #swagger.responses[400] = { description: 'Invalid ID format / Bad request' }
  */
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) return res.status(404).json({ success: false, message: 'Event not found' });

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
