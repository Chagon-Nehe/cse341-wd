// Import body-parser to parse JSON request bodies
import bodyParser from 'body-parser';
// import mongodb from 'mongodb';
import express from 'express';

// Import the router from routes/index.js
import router from './api/routes/index.js';
import { initDB } from './connection.js';

// create an instance of the Express application
const app = express();
const port = process.env.PORT || 8080;

// Middleware to parse JSON request bodies
app.use(bodyParser.json());
// swagger middleware setup
app.use((req, res, next) => {
  res.setHeader('access-Control-Allow-Origin', '*');
  res.setHeader('access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader(
    'access-Control-Allow-Headers',
    'Content-Type',
    'Origin, X-Requested-With, Accept, Z-key'
  );
  next();
});

// Use the router for all routes
app.use('/', router);

// Start the server after connecting to MongoDB
initDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server listening at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Failed to start server:', error);
  });
