import mongoose from "mongoose"

const connectDB = () => {
    mongoose.set('strictQuery', false)

    mongoose.connect(process.env.MONGO_URI, {dbName: 'ExpressTut'})
   .then(res => res && console.log('Connected to DB'))
   .catch(err => console.log(err))

}

export default connectDB