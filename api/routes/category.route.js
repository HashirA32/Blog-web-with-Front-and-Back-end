
import express from 'express'
import { addCategory, deleteCategory, getAllCategory, showCategory, updateCategory } from '../controllers/Category.controller.js'
import { onlyadminauthenticate } from '../middleware/onlyAdminAuthenticate.js'
import { authenticate } from '../middleware/authenticate.js'


const CategoryRoute = express.Router()
CategoryRoute.post('/add',onlyadminauthenticate, addCategory)
CategoryRoute.put('/update/:categoryid',authenticate, updateCategory)
CategoryRoute.get('/show/:categoryid',onlyadminauthenticate, showCategory)
CategoryRoute.delete('/delete/:categoryid',onlyadminauthenticate, deleteCategory)
CategoryRoute.get('/all-categories',getAllCategory)


export default CategoryRoute