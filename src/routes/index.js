import { Router } from "express";
import authRoutes from './auth/authroutes.js'
import apiRoutes from './api/todoroutes.js'
import publicRoutes from './public/publicRoutes.js'
// import webRoutes from './app/index.js'
// import publicRoutes from './app/publicroutes.js'
const router = Router();
router.use('/', publicRoutes)
router.use("/auth", authRoutes);
router.use("/api", apiRoutes);

router.get('*', (req, res) => {
    res.status(404).render('public/404')
})

export default~ router;
