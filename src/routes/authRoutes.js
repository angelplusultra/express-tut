import { Router } from "express";
import isEmail from "validator/lib/isEmail.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import passport from "passport";
import authControllers from "../controllers/authcontroller.js";

const router = Router();

router.post("/register", authControllers.register );

router.post("/vanilla/login", authControllers.vanillaLogin );

router.post('/login', passport.authenticate('local'), authControllers.passportLogin  )

router.get('/oauth', (req, res) => {
    res.send('<a href="/auth/google">Authenticate with Google</a>')
})
router.get('/google', passport.authenticate('google', {scope: ['email', 'profile']}))

router.get('/google/callback', passport.authenticate('google', {
    successRedirect: '/todos',
    failureRedirect: '/auth/oauth'
}))

router.get('/logout', function(req, res, next) {
    req.logout((err) => {
        if(err) return next(err)

        res.send('googbye')
    })
});

export default router;
