import mongoose from "mongoose";
import User from "../models/User.js";

const isAuthenticated = (req, res, next) =>
  !req.session.user ? res.status(401).json({ err: "Unauthorized" }) : next();

const isAuth = (req, res, next) => {
  if (!req.isAuthenticated()) {
    
        if (!req.query.apikey) {
      return res.status(401).json({ err: "Unauthorized" });
    }
    const { apikey: apiKey } = req.query;
    console.log(req.sessionID)
    if (!mongoose.Types.ObjectId.isValid(apiKey))
      return res.status(401).json({ err: "Unauthorized" });
    User.findOne({ apiKey }).then((user) => {
        
      if (!user) return res.status(401).json({ err: "Unauthorized" });

      req.session.user = user

      next();
    });
  } else {
    next();
  }
};
export { isAuthenticated, isAuth };
