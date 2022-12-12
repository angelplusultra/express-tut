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

export default router;
