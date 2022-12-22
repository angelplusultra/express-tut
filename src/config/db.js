import mongoose from "mongoose"
import keysCongig from "./keys.js"
const keys = keysCongig()
const connectDB = () => {
    mongoose.set('strictQuery', false)

    mongoose.connect(process.env.MONGO_URI, {dbName: 'ExpressTut'})
   .then(res => res && console.log('Connected to DB'))
   .catch(err => console.log(err))

}

export default connectDB