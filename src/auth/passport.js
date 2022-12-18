import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import { config } from "dotenv";
import keysCongig from "../config/keys.js";

config({ path: "src/config/.env" });

console.log(process.env.CLIENT_ID, process.env.CLIENT_SECRET);






////Creates a cookie containing the user id
passport.serializeUser((user, done) => {
  done(null, user.id);
});
//// When a subsequent request returns to us, we take the id inside the cookie, search the DB, and populate req.user with the user document
passport.deserializeUser((id, done) => {
  User.findById(id)
    .then((user) => {
      if (!user) return done(null, false);

      done(null, user);
    })
    .catch((err) => done(err, false));
});






passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "/auth/google/redirect",
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(profile);

      User.findOne({
        $or: [{ email: profile._json.email }, { googleID: profile.id }],
      })
        .then((user) => {
          if (user) return done(null, user);

          User.create({ googleID: profile.id, displayName: profile.displayName, profilePic: profile._json.picture })
            .then((user) => {
              return done(null, user);
            })
            .catch((err) => done(err, false));
        })
        .catch((err) => done(err, false));
    }
  )
);

passport.use(
  new LocalStrategy({ usernameField: "email", passReqToCallback: true }, (req, email, password, done) => {
    console.log(email);
    if (!email || !password)
      return done(null, false, {message: 'Invalid Form'});
    User.findOne({ email })
      .then((user) => {
        if (!user)
          return done(null, false, {message: 'User not found'});

        bcrypt
          .compare(password, user.password)
          .then((isMatch) => {
            if (!isMatch)
              return done(null, false, {message: 'Invalid Credentials'});

            return done(null, user, {message: 'Welcome back!'});
          })
          .catch((err) => done(err, false));
      })
      .catch((err) => done(err, false));
  })
);
