import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    apiKey: {
        type: mongoose.Types.ObjectId,
        required: true,
        unique: true
    }
})

export default model('User', userSchema)