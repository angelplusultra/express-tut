import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema({
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
    },
    apiKey: {
        type: mongoose.Types.ObjectId,
        
        unique: true
    },
    googleID: {
        type: String,

    }
})

export default model('User', userSchema)