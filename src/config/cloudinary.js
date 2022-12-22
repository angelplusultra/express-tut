import { v2 } from "cloudinary";
import dotenv from 'dotenv'
dotenv.config({path: 'src/config/.env'})


v2.config({
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET ,
    cloud_name: process.env.CLOUD_NAME
})

export default v2