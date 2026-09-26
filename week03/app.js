const express = require('express');
const dotenv = require('dotenv');


// Load environment variables
dotenv.config();

// Connect to Database
const connectDB = require('./config/db');

connectDB();

const app = express();

// Body parser middleware
app.use(express.json());

// Mount Routes
app.use('/api/venues', require('./routes/venueRoutes'));
app.use('/api/events', require('./routes/eventRoutes'));

const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
