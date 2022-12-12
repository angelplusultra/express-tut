import express from "express";
import todoRoutes from "./routes/todoroutes.js";
import connectDB from "./config/db.js";
import authRouter from "./routes/authRoutes.js";
import session from "express-session";
import passport from "passport";
import LocalStrategy from "./auth/local.js";
import logger from "./middleware/logger.js";
import { config } from "dotenv";

config({path: 'src/config/.env'})

const app = express();
const PORT = process.env.PORT || 8000;

// Connect to DB
connectDB();


// Setting up Passport-Local
LocalStrategy();

// Express-Session Middleware
app.use(
  session({
    secret: "skagdkasgdkagd",
    resave: false,
    saveUninitialized: false,
  })
);
// Body-Parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Passport Initialization 
app.use(passport.initialize());
//Telling Passport we're using express-session for our sessions
app.use(passport.session());

// Routes
app.use(logger);
app.use("/auth", authRouter);
app.use("/todos", todoRoutes);


// Listen
app.listen(PORT, console.log(`Lsitening to ${PORT} 👉 http://localhost:8000/`));
