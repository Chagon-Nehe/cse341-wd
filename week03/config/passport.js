const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL
    },
    function (accessToken, refreshToken, profile, done) {
      // For this project, we pass the profile forward to keep it simple.
      // In production, you would save this user profile to a MongoDB collection.
      return done(null, profile);
    }
  )
);

// Serialize user into the session store
passport.serializeUser((user, done) => {
  done(null, user);
});

// Deserialize user out of the session store
passport.deserializeUser((user, done) => {
  done(null, user);
});
