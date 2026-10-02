// Middleware to check if the user is authenticated via OAuth
exports.ensureAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next(); // User is authenticated; proceed to protected route
  }

  // Block unauthenticated users immediately
  return res.status(401).json({
    success: false,
    message: 'Unauthorized. Please log in via OAuth first.',
    // click: `https://cse341-wd-1.onrender.com/auth/google` // Provide a link to initiate OAuth login
  });
};