import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import User from "../models/User.js";

const GOOGLE_CLIENT_ID =
  "164831551673-frms7vn25mcf1p96acotcg54014jbf76.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:8000/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, cb) {
      const user = await User.findOne({googleID: profile.id }).catch(err => cb(err, null));
        console.log(profile)
      if (user) return cb(null, user);

      const newUser = await User.create({ googleID: profile.id, email: profile.email }).catch((err) =>
        cb(err, null)
      );

      cb(null, newUser);
    }
  )
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));
