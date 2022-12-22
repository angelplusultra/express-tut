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
  profilePicture: {
    picturePath: {
      type: String,
      default: ''
    },
    cloudinaryId: {
      type: String,
      default: ''
    }
  },
  displayName: String
});

export default model("User", userSchema);
