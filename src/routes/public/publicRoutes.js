import { Router } from "express";
import express from 'express'

const router = Router()


router.get('/', (req, res) => {
    res.render('public/index')
})

router.get('/register', (req, res) => {
    res.render('public/register')
})

router.get('/login', (req, res) => {
    res.render('public/login')
})

router.get('/static', express.static('src/public') )

export default router