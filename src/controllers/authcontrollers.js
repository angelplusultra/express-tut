import validator from "validator";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'


const authController = {
  Register: (req, res) => {
    const { email, password, confirmPassword } = req.body;

    const errors = []

    //  1: Form Validation
    if (!email || !password || !confirmPassword)
      errors.push({msg: 'Invalid Form'})
    if (password !== confirmPassword)
      errors.push({ msg: "Passwords do not match" });
    if (!validator.isEmail(email))
      errors.push({ msg: "Invalid email" });


      

    //  2: Search the DB if the use already exists
    User.findOne({ email }).then((user) => {
      if (user)
        errors.push({ msg: "Email already registered" });

        if(errors.length){
          req.flash("errors", errors)
          return res.redirect('/register')
        }

      //  3: Password hashing
      bcrypt
        .genSalt()
        .then((salt) => {
          bcrypt
            .hash(password, salt)
            .then((hash) => {
              // 4: Creation of New User to the DB
              User.create({ email, password: hash })
                .then((user) =>
                  res
                    .status(200)
                    .json({ msg: "Thank you for registering", user })
                )
                .catch((err) => res.status(500).json({ err: err.message }));
            })
            .catch((err) => res.status(500).json({ err: err.message }));
        })
        .catch((err) => res.status(500).json({ err: err.message }));
    });
  },

  
  Login: (req, res) => {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ err: "Invalid form" });
    if (!validator.isEmail(email))
      return res.status(400).json({ err: "Invalid email" });
    User.findOne({ email }).then((user) => {
      if (!user) return res.status(400).json({ err: "Email not registered" });

      bcrypt.compare(password, user.password).then((isMatch) => {
        if (!isMatch) return res.sendStatus(401);

      //********EXPRESS-SESSION***********
      // req.session.user = user;
      // res.redirect('/api')
        // return;
      //***********JWT*******
      // const token = jwt.sign({email: user.email, id: user.id}, process.env.JWT_SECRET, {expiresIn: '10d'})
      // res.cookie('token', token)
      // res.redirect('/api')
      // return;

        
        

        
      });
    });
  },
};


export default authController
