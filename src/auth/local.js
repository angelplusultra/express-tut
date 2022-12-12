import passport from "passport";
import { Strategy } from "passport-local";
import isEmail from "validator/lib/isEmail.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";

function LocalStrategy() {
  passport.use(
    new Strategy({ usernameField: "email" }, (email, password, done) => {
      if (!email || !password) return done(new Error("Bad Request"), null);

      if (!isEmail(email)) return done(new Error("Invalid email"), null);

      User.findOne({ email }).then((user) => {
        if (!user) return done(new Error("User not found"), null);

        bcrypt.compare(password, user.password).then((isMatch) => {
          if (!isMatch) return done(new Error("Invalid credentials"), null);

          done(null, user);
        });
      });
    })
  );
}

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then((user) => {
      if (!user) throw new Error("User not found");

      done(null, user);
    })
    .catch((err) => {
      console.log(err);
      done(err, null);
    });
});

export default LocalStrategy;
