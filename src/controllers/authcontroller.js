import isEmail from "validator/lib/isEmail.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import mongoose, { mongo } from "mongoose";


const authControllers = {
    register: (req, res) => {
        const { email, password, confirmPassword } = req.body;
      
        if (!email || !password || !confirmPassword)
          return res.status(400).json({ err: "Invalid form body" });
        if (!isEmail(email)) return res.status(400).json({ err: "Invalid email" });
        if (password !== confirmPassword)
          return res.status(400).json({ err: "Passwords do not match" });
      
        User.findOne({ email }).then((user) => {
          if (user) return res.status(400).json({ err: "Email already registered" });
      
          bcrypt
            .genSalt()
            .then((salt) =>
              bcrypt.hash(password, salt).then((hash) => {
                const apiKey = new mongoose.Types.ObjectId()
                User.create({ email, password: hash, apiKey }).then((newUser) =>
                  res.status(200).json({ msg: `You've been registered!`, newUser })
                );
              })
            )
            .catch((err) => res.status(400).json({ err: err.message }));
        });
      },
      vanillaLogin: (req, res) => {
        const { email, password } = req.body;
        if (!email || !password)
          return res.status(400).json({ err: "Invalid form body" });
        if (!isEmail(email)) return res.status(400).json({ err: "Invalid email" });
      
        User.findOne({ email }).then((user) => {
          if (!user)
            return res.status(404).json({ err: "Email not registered to any user" });
      
          bcrypt.compare(password, user.password).then((isMatch) => {
            if (!isMatch)
              return res.status(401).json({ err: "Inccorect credentials" });
      
            req.session.user = user;
      
            res.status(200).json({ msg: "You've been auuthenticated" });
          });
        });
      
        
      },
      passportLogin: (req, res) => {
        res.json({msg: 'Success, you have been authenticated'})
        console.log(req.user)
    }
}

export default authControllers