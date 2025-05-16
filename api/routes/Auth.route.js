import express from 'express'
import { GoogleLogIn, LogIn, Loguot, Register } from '../controllers/Auth.controller.js'
import { authenticate } from '../middleware/authenticate.js'


const AuthRoute = express.Router()
AuthRoute.post('/register',Register)
AuthRoute.post('/login',LogIn)
AuthRoute.post('/google-login',GoogleLogIn)
AuthRoute.get('/logout', authenticate, Loguot)


export default AuthRoute