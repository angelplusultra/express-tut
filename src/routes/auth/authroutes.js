import { Router } from "express";
import authController from "../../controllers/authcontrollers.js";
const {Register, Login} = authController
import passport from "passport";


const router = Router();







// *************VANILLA LOCAL AUTH****************
router.post("/register", Register);

router.post("/login", Login);









// ***********PASPPORT LOCAL AUTH**************
router.post('/passport', passport.authenticate('local', {successRedirect: '/api'}));











// ***********PASSPORT GOOGLE OAUTH2.0********************

// Reveals the consent screen and tells google we want to access user data
router.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}) )


// the callback uri after the user grants/denies access on the consent screen AND fires the Google Strategy defined in ../../auth/passport.js
router.get('/google/redirect', passport.authenticate('google', {successRedirect: '/api'}) )









router.get('/login', (req, res) => {
  res.render('login')

})



export default router;
