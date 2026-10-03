const express = require('express');
const passport = require('passport');
const router = express.Router();

// @desc    Auth with Google & Track where the user came from
// @route   GET /auth/google
router.get('/google', (req, res, next) => {
  // Check if the request originated from the Swagger UI documentation page
  const referer = req.headers.referer || '';
  if (referer.includes('/api-docs')) {
    req.session.returnTo = '/auth/google/callback'; // Redirect back to Swagger UI after successful login
  } else {
    req.session.returnTo = '/'; // Fallback to home root
  }
  // Proceed to standard passport authentication
  passport.authenticate('google', { scope: ['profile', 'email'] })(req, res, next);
});

// @desc    Google auth callback
// @route   GET /auth/google/callback
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/auth/google' }),
  (req, res) => {
    // Retrieve the stored redirect destination, or default to home root
    const redirectUrl = req.session.returnTo || '/';

    // Clean up the session variable so it doesn't persist unexpectedly
    delete req.session.returnTo;

    // Perform the redirect!
    res.redirect(redirectUrl);
  }
);

// @desc    Logout user
// @route   GET /auth/logout
router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/api-docs'); // Redirect back to docs after logging out
  });
});

module.exports = router;
