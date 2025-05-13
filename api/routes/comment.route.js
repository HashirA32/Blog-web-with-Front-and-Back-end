
import express from 'express'
import { addComment, CommentCount, deleteComment, getAllComment, showComment } from '../controllers/Comment.controller.js'


const CommentRoute = express.Router()
CommentRoute.post('/add',addComment)
CommentRoute.get('/get/:blogid',showComment)
CommentRoute.get('/get-count/:blogid',CommentCount)
CommentRoute.get('/get-all-comment',getAllComment)
CommentRoute.delete('/delete/:commentid',deleteComment)



export default CommentRoute 