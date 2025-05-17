import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import AuthRoute from './routes/Auth.route.js'
import UserRoute from './routes/UserRoute.js'
import CategoryRoute from './routes/category.route.js'
import BlogRoute from './routes/blog.route.js'
import CommentRoute from './routes/comment.route.js'
import BlogLikeRoute from './routes/BlogLike.route.js'

dotenv.config()

const PORT = process.env.PORT 
const app = express()

app.use(cookieParser())
app.use(express.json())
const allowedOrigins = [
  "http://localhost:5173",
  process.env.FRONTEND_URL // Add your main production URL if needed
];

app.use(cors({
  origin: function (origin, callback) {
    if (
      !origin || 
      allowedOrigins.includes(origin) || 
      origin.endsWith(".vercel.app")
    ) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS: " + origin));
    }
  },
  credentials: true
}));

app.use((req, res, next) => {
    res.removeHeader('Cross-Origin-Opener-Policy');
    next();
});

app.use('/api/auth', AuthRoute)
app.use('/api/user', UserRoute)
app.use('/api/category', CategoryRoute)
app.use('/api/blog', BlogRoute)
app.use('/api/comment', CommentRoute)
app.use('/api/blog-like', BlogLikeRoute)


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