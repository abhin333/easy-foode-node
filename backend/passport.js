
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();


if(!process.env.CLIENT_ID || !process.env.CLIENT_SECRET){
  throw new Error("CLIENT_ID and CLIENT_SECRET must be provided");
}

passport.use(new GoogleStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: "http://localhost:3005/auth/callback",
  scope: ['profile', 'email']
},
(accessToken, refreshToken, profile, done) => {
  // Assuming userProfile is defined elsewhere or should be handled in this scope
  const userProfile = profile;
  return done(null, userProfile);
}
));
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});