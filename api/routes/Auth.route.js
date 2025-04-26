import express from 'express'
import { GoogleLogIn, LogIn, Register } from '../controllers/Auth.controller.js'


const AuthRoute = express.Router()
AuthRoute.post('/register',Register)
AuthRoute.post('/login',LogIn)
AuthRoute.post('/google-login',GoogleLogIn)


export default AuthRoute