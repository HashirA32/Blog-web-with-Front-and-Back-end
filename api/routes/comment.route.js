
import express from 'express'
import { addComment, CommentCount, showComment } from '../controllers/Comment.controller.js'


const CommentRoute = express.Router()
CommentRoute.post('/add',addComment)
CommentRoute.get('/get/:blogid',showComment)
CommentRoute.get('/get-count/:blogid',CommentCount)



export default CommentRoute 