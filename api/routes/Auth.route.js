import express from 'express'
import { LogIn, Register } from '../controllers/Auth.controller.js'


const AuthRoute = express.Router()
AuthRoute.post('/register',Register)
AuthRoute.post('/LogIn',LogIn)


export default AuthRoute