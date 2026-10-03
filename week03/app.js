const express = require('express');
const dotenv = require('dotenv');
const session = require('express-session');
const passport = require('passport');
const { ensureAuth } = require('./middleware/auth');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json'); // Import the auto-generated file
const connectDB = require('./config/db');

dotenv.config();

// Load Passport Configuration
require('./config/passport');


connectDB();



const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Express Session Middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
);

// Initialize Passport Session
app.use(passport.initialize());
app.use(passport.session());

// Protect the absolute homepage route (/)
app.get('/', ensureAuth, (req, res) => {
  // If the user passes ensureAuth, they are successfully logged in
  res.send(`
        <h1>Welcome to the Campus Event Management API</h1>
        <p>Logged in successfully as: <strong>${req.user.displayName || req.user.emails[0].value}</strong></p>
        <a href="/api-docs">Go to Interactive Swagger API Documentation</a> | 
        <a href="/auth/logout">Logout</a>
    `); 
});

// Dynamically construct the callback URL based on the environment context
const hostUrl = process.env.NODE_ENV === 'production' 
  ? 'https://cse341-wd-1.onrender.com' 
  : `http://localhost:${process.env.PORT || 8081}`;

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, {
    swaggerOptions: {
      oauth2RedirectUrl: `${hostUrl}/auth/google/callback`,
      initOAuth: {
        clientId: process.env.GOOGLE_CLIENT_ID,
        scopes: ['profile', 'email'],
        appName: 'Campus Event API'
      }
    }
  })
);


// Mount Routes
app.use('/auth', require('./routes/authRoutes'));
app.use('/api/venues', require('./routes/venueRoutes'));
app.use('/api/events', require('./routes/eventRoutes'));

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Docs available at http://localhost:${PORT}/api-docs`);
});
