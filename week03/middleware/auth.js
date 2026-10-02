// Middleware to check if the user is authenticated via OAuth
exports.ensureAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next(); // User is authenticated; proceed to protected route
  }
  // Block unauthenticated users immediately
  return res.status(401).json({
    success: false,
    message: 'Unauthorized. Please log in via OAuth first.',
    
  });
  return res.redirect('/auth/google'); // Redirect to Google OAuth login if not authenticated
};