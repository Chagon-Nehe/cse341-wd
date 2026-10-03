const mongoose = require('mongoose');
// Venue model for the Campus Event Management API
// This model defines the structure of a venue document in the MongoDB database.
// Add in data validation and constraints to ensure data integrity.
const VenueSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a venue name'],
      unique: true,
      trim: true,
      minlength: [2, 'Venue name must be at least 2 characters long'],
      maxlength: [50, 'Venue name cannot exceed 50 characters']
    },
    building: {
      type: String,
      required: [true, 'Please add a building name'],
      trim: true,
      minlength: [2, 'Building name must be at least 2 characters long'],
      maxlength: [50, 'Building name cannot exceed 50 characters']
    },
    capacity: {
      type: Number,
      required: [true, 'Please add room seating capacity'],
      min: [1, 'Capacity must be at least 1 person'],
      max: [10000, 'Capacity cannot exceed 10,000 people'],
      validate: {
        validator: Number.isInteger,
        message: 'Capacity must be a whole number'
      }
    },
    hasProjector: {
      type: Boolean,
      required: [true, 'Please specify if the venue has a projector'],
      default: true
    }
  },
  { timestamps: true }
);
module.exports = mongoose.model('Venue', VenueSchema);
