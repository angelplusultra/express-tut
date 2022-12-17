import express from "express";
import todoRoutes from "./routes/api/todoroutes.js";
import connectDB from "./config/db.js";
import logger from "./middleware/logger.js";
import { config } from "dotenv";
import session from "express-session";
import routes from './routes/index.js'
import cookieParser from "cookie-parser";
import passport from "passport";
import MongoStore from "connect-mongo";
import path from 'path'
import methodOverride from 'method-override'
import flash from 'express-flash'


/// .env Config
config({path: 'src/config/.env'})

// Passport Strategies
import './auth/passport.js'



const app = express();
const PORT = process.env.PORT || 8000;

// Connect to DB
connectDB();

// View Engine Config
app.set('view engine', 'ejs')
app.set('views', 'src/views')

app.use(express.static('src/public'))

app.use(methodOverride('_method'))

app.use(flash())

//Express Session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({mongoUrl: process.env.MONGO_URI, dbName: 'ExpressTut'})

}))

// Cookie Parser
app.use(cookieParser())

// Body-Parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Passport Init
app.use(passport.initialize())

// Telling Passport we're using Express-Session
app.use(passport.session())

// Global Logger
app.use(logger);

// Routes
app.use(routes)

// Listen
app.listen(PORT, console.log(`Lsitening to ${PORT} 👉 http://localhost:8000/`));
