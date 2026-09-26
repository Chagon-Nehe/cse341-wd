const mongoose = require('mongoose');

const VenueSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a venue name'],
      unique: true,
      trim: true
    },
    building: {
      type: String,
      required: [true, 'Please add a building name']
    },
    capacity: {
      type: Number,
      required: [true, 'Please add room seating capacity']
    },
    hasProjector: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Venue', VenueSchema);
