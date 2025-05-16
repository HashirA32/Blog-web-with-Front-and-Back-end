
import express from 'express'
import { addComment, CommentCount, deleteComment, getAllComment, showComment } from '../controllers/Comment.controller.js'
import { authenticate } from '../middleware/authenticate.js'


const CommentRoute = express.Router()
CommentRoute.post('/add',authenticate,addComment)
CommentRoute.get('/get/:blogid',showComment)
CommentRoute.get('/get-count/:blogid',CommentCount)
CommentRoute.get('/get-all-comment',getAllComment)
CommentRoute.delete('/delete/:commentid',authenticate,deleteComment)



export default CommentRoute 