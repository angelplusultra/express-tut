import { Router } from "express";
import authController from "../../controllers/authcontrollers.js";
const { Register, Login } = authController;
import passport from "passport";

const router = Router();

// *************VANILLA LOCAL AUTH****************
router.post("/register", Register);

router.post("/login", Login);

// ***********PASPPORT LOCAL AUTH**************
router.post('/passport',passport.authenticate('local', {failureRedirect: '/login', failureFlash: true}), (req, res) => {
  req.flash('success', 'Welcome back!')
  res.redirect('/api')
});

// router.post("/passport", (req, res, next) => {
//   passport.authenticate("local", (err, user, info) => {
//     if (err) {
//       return next(err); // will generate a 500 error
//     }
//     // Generate a JSON response reflecting authentication status
//     if (!user) {
//       req.flash("errors", "No User Exists With that Email");
//       return res.redirect("/login");
//     }
//     // ***********************************************************************
//     // "Note that when using a custom callback, it becomes the application's
//     // responsibility to establish a session (by calling req.login()) and send
//     // a response."
//     // Source: http://passportjs.org/docs
//     // ***********************************************************************
//     req.login(user, (loginErr) => {
//       if (loginErr) {
//         return next(loginErr);
//       }
//       req.flash('success', 'Welcome!')
//       return res.redirect("/api");
//     });
//   })(req, res, next);
// });

// ***********PASSPORT GOOGLE OAUTH2.0********************

// Reveals the consent screen and tells google we want to access user data
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// the callback uri after the user grants/denies access on the consent screen AND fires the Google Strategy defined in ../../auth/passport.js
router.get(
  "/google/redirect",(req, res, next) => {
    passport.authenticate("google", (err, user, info) => {
      if (err) {
        return next(err); // will generate a 500 error
      }
      // Generate a JSON response reflecting authentication status
      if (!user) {
        req.flash("errors", "No User Exists With that Email");
        return res.redirect("/login");
      }
      // ***********************************************************************
      // "Note that when using a custom callback, it becomes the application's
      // responsibility to establish a session (by calling req.login()) and send
      // a response."
      // Source: http://passportjs.org/docs
      // ***********************************************************************
      req.login(user, (loginErr) => {
        if (loginErr) {
          return next(loginErr);
        }
        req.flash('success', 'Welcome!')
        return res.redirect("/api");
      });
    })(req, res, next);
  })


router.get("/login", (req, res) => {
  res.render("login");
});

export default router;
