const Venue = require('../models/Venue');

// @desc    Create a new venue
// @route   POST /api/venues
exports.createVenue = async (req, res) => {
  /*  #swagger.tags = ['Venues']
      #swagger.summary = 'Create a new campus venue'
      #swagger.security = [{ "googleOAuth": ["profile", "email"] }] 
      #swagger.parameters['obj'] = {
          in: 'body',
          description: 'Venue information payload',
          required: true,
          schema: { $ref: '#/definitions/VenueInput' }
      } 
  */
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
  /*  #swagger.tags = ['Venues']
      #swagger.summary = 'Retrieve a list of all campus venues'
      #swagger.responses[200] = {
          description: 'Array of venues found successfully',
          schema: [{ $ref: '#/definitions/VenueResponse' }]
      }
  */
  try {
    const venues = await Venue.find();
    res.status(200).json({ success: true, count: venues.length, data: venues });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Get single venue by ID
// @route   GET /api/venues/:id
exports.getVenueById = async (req, res) => {
  /*  #swagger.tags = ['Venues']
      #swagger.summary = 'Get a single venue by its ID'
      #swagger.parameters['id'] = {
          in: 'path',
          description: 'Venue ID',
          required: true,
          type: 'string'
      }
      #swagger.responses[200] = {
          description: 'Venue found successfully',
          schema: { $ref: '#/definitions/VenueResponse' }
      }
      #swagger.responses[404] = {
          description: 'Venue not found'
      }
  */
  try {
    const venue = await Venue.findById(req.params.id);
    if (!venue) {
      return res.status(404).json({ success: false, error: 'Venue not found' });
    }
    res.status(200).json({ success: true, data: venue });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Update a venue
// @route   PUT /api/venues/:id
exports.updateVenue = async (req, res) => {
  /*  #swagger.tags = ['Venues']
      #swagger.summary = 'Update an existing venue by ID'
      #swagger.security = [{ "googleOAuth": ["profile", "email"] }] 
      #swagger.parameters['id'] = {
          in: 'path',
          description: 'Venue ID',
          required: true,
          type: 'string'
      }
      #swagger.parameters['obj'] = {
          in: 'body',
          description: 'Updated venue payload',
          required: true,
          schema: { $ref: '#/definitions/VenueInput' }
      }
      #swagger.responses[200] = {
          description: 'Venue updated successfully',
          schema: { $ref: '#/definitions/VenueResponse' }
      }
      #swagger.responses[400] = {
          description: 'Validation error or invalid payload'
      }
      #swagger.responses[404] = {
          description: 'Venue not found'
      }
  */
  try {
    const venue = await Venue.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!venue) {
      return res.status(404).json({ success: false, error: 'Venue not found' });
    }

    res.status(200).json({ success: true, data: venue });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Delete a venue
// @route   DELETE /api/venues/:id
exports.deleteVenue = async (req, res) => {
  /*  #swagger.tags = ['Venues']
      #swagger.summary = 'Delete a venue by ID'
      #swagger.security = [{ "googleOAuth": ["profile", "email"] }] 
      #swagger.parameters['id'] = {
          in: 'path',
          description: 'Venue ID',
          required: true,
          type: 'string'
      }
      #swagger.responses[200] = {
          description: 'Venue deleted successfully'
      }
      #swagger.responses[404] = {
          description: 'Venue not found'
      }
  */
  try {
    const venue = await Venue.findByIdAndDelete(req.params.id);

    if (!venue) {
      return res.status(404).json({ success: false, error: 'Venue not found' });
    }

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
