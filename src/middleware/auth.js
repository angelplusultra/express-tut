import mongoose from "mongoose";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import keysCongig from "../config/keys.js";

const keys = keysCongig()

export const isAuth = (req, res, next) => {
  if (!req.session.user && !req.query.apikey) {
    return res.sendStatus(401);
  } else if (req.query.apikey) {
    const { apikey } = req.query;
    if (!mongoose.Types.ObjectId.isValid(apikey)) return res.sendStatus(401);

    User.findOne({ apikey }).then((user) => {
      if (!user) return res.sendStatus(401);

      req.session.user = user;
      return next();
    });
  } else if (req.session.user) {
    next();
  }







  // if(!req.session.user && !req.query.apikey) return res.sendStatus(401)

  // if(req.query.apikey){
  //     const { apikey } = req.query
  //     if(!mongoose.Types.ObjectId.isValid(apikey)) return res.sendStatus(401)

  //     User.findOne({apikey}).then(user => {
  //                 if(!user) return res.sendStatus(401)

  //                 return next()
  //             })

  // }

  // if(req.session.user){
  //     return next()
  // }
};

export const jwtAuth = (req, res, next) => {
  try {
    const { token } = req.cookies;
    const user = jwt.verify(token, keys.jwt.JWT_SECRET );
    req.user = user;
    next()
  } catch (error) {
    res.clearCookie('token')
    return res.sendStatus(401)
  }
};


export const passportAuth = (req, res, next) => {
  if(!req.isAuthenticated()) return res.redirect('/')

  next()
}

export const jwtAuthorization = (req, res, next) => {
  const token = req.cookies.token;
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.clearCookie("token");
    return res.sendStatus(401);
  }
};
