import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  googleID: {
    type: String,
    
  },
  apikey: {
    type: mongoose.Types.ObjectId,
    default: new mongoose.Types.ObjectId()
  },
  displayName: {
    type: String,
    
  }
});

export default model("User", userSchema);
