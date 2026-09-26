const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Event title is required'],
      trim: true,
      maxlength: [100, 'Title cannot be more than 100 characters']
    },
    description: {
      type: String,
      required: [true, 'Event description is required'],
      minlength: [10, 'Description must be at least 10 characters long']
    },
    date: {
      type: Date,
      required: [true, 'Event date and time are required'],
      // Custom validator to ensure the event isn't scheduled in the past
      validate: {
        validator: function (value) {
          return value >= new Date();
        },
        message: 'Event date must be in the future'
      }
    },
    organizer: {
      type: String,
      required: [true, 'Organizer name or student club is required'],
      trim: true
    },
    venueId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Venue',
      required: [true, 'A valid Venue ID must be assigned']
    },
    capacity: {
      type: Number,
      required: [true, 'Attendance capacity is required'],
      min: [5, 'Capacity must be at least 5 attendees'],
      max: [1000, 'Capacity cannot exceed 1000 due to fire codes']
    },
    isPublished: {
      type: Boolean,
      default: false
    },
    tags: {
      type: [String],
      // Validates that they provide appropriate tags
      validate: {
        validator: function (v) {
          return v && v.length > 0;
        },
        message: 'Please provide at least one search tag'
      }
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Event', EventSchema);
