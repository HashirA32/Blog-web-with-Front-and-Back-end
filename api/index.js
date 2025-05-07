import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import AuthRoute from './routes/Auth.route.js'
import UserRoute from './routes/UserRoute.js'
import CategoryRoute from './routes/category.route.js'
import BlogRoute from './routes/blog.route.js'

dotenv.config()

const PORT = process.env.PORT 
const app = express()

app.use(cookieParser())
app.use(express.json())
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}))
app.use((req, res, next) => {
    res.removeHeader('Cross-Origin-Opener-Policy');
    next();
});

app.use('/api/auth', AuthRoute)
app.use('/api/user', UserRoute)
app.use('/api/category', CategoryRoute)
app.use('/api/blog', BlogRoute)


mongoose.connect(process.env.MONGODB_CONN,{dbName:'mern-blog'})
.then(()=> {console.log('DataBase Connected')})
.catch((err)=>{console.log('DataBase connection Failed', err)})



app.listen(PORT, () => {
    console.log('Server running on port:', PORT)
})


app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || 'Internal server error.'
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})