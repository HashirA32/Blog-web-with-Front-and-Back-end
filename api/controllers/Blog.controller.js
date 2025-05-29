import cloudinary from "../config/Cloudnary.js";
import { handleError } from "../helpers/handleError.js";
import Blog from "../models/blog.model.js";
import {encode} from 'entities'
import Category from "../models/category.model.js";

export const addBlog = async (req, res, next)=> {
    try {
        const data = JSON.parse(req.body.data)
        let featuredImage = ''
         if(req.file){
           
             const uploadResult = await cloudinary.uploader
             .upload(
              req.file.path,
              {
                folder:'mern-blogs',
                resource_type: 'auto'
              }
             ) .catch((error) => {
                next(handleError(500,error.message))
            });
            featuredImage = uploadResult.secure_url
            }
        const blog = new Blog({
            auther: data.auther,
            category: data.category,
            title: data.title,
            slug: data.slug,
            featureImage: featuredImage,
            blogContent: encode(data.blogContent)
        })
        await blog.save()
        res.status(200).json({
            success: true,
            message: "Blog added successfully",
         
           
          });
    } catch (error) {
        next(handleError(500,error.message))
    }
}

export const editBlog = async (req, res, next)=> {
    const {blogid} = req.params
    try {
        const blog = await Blog.findById(blogid).populate('category', 'name')
        if(!blog){
            next(handleError(404,'Data not Found'))
        }
        res.status(200).json({
            blog
        })
    } catch (error) {
        next(handleError(500,error.message))
    }
}
export const updateBlog = async (req, res, next)=> {
    try {
        const {blogid} = req.params
        const data = JSON.parse(req.body.data)
        const blog = await Blog.findById(blogid)
        blog.category = data.category
        blog.title = data.title
        blog.slug = data.slug
        blog.blogContent = encode(data.blogContent)



        let featuredImage = blog.featureImage
         if(req.file){
             
             const uploadResult = await cloudinary.uploader
             .upload(
              req.file.path,
              {
                folder:'mern-blogs',
                resource_type: 'auto'
              }
             ) .catch((error) => {
                next(handleError(500,error.message))
            });
            featuredImage = uploadResult.secure_url
            }
            blog.featureImage = featuredImage

            await blog.save()
        res.status(200).json({
            success: true,
            message: "Blog Updated successfully",
         
           
          });
    } catch (error) {
        next(handleError(500,error.message))
    }
}

export const deleteBlog = async (req, res, next)=> {
    try {
           const {blogid} = req.params
           await Blog.findByIdAndDelete(blogid)
           
             res.status(200).json({
                 success: true,
                 message: "Blog Deleted successfully",
                
               });
       } catch (error) {
           next(handleError(500,error.message))
       }
}
export const showAllBlog = async (req, res, next)=> {
    try {
        const user = req.user
        let blog
        if(user.role === 'admin') {
         
        blog = await Blog.find().populate('auther', 'name avatar role').populate('category', 'name slug').sort({createdAt: -1}).lean().exec()
           
        } else {
                    blog = await Blog.find({auther: user._id}).populate('auther', 'name avatar role').populate('category', 'name slug').sort({createdAt: -1}).lean().exec()

        }
        
        res.status(200).json({
            blog
        })
    } catch (error) {
        next(handleError(500,error.message))
    }
}


export const showAllBlogHome = async (req, res, next)=> {
    try {
        const user = req.user
      
        const blog = await Blog.find().populate('auther', 'name avatar role').populate('category', 'name slug').sort({createdAt: -1}).lean().exec()
       
        res.status(200).json({
            blog
        })
    } catch (error) {
        next(handleError(500,error.message))
    }
}


export const getBlog = async (req, res, next)=> {
    try {
        const {slug} = req.params
        const blog = await Blog.findOne({slug}).populate('auther', 'name avatar role').populate('category', 'name slug').lean().exec()
        res.status(200).json({
            blog
        })
    } catch (error) {
        next(handleError(500,error.message))
    }
}
export const getRelatedBlog = async (req, res, next)=> {
    try {
        const {category,blog} = req.params
        const categoryData = await Category.findOne({slug: category})
        if(!categoryData){
            next(handleError(404,'Category data not found'))
        }
        const categoryId = categoryData._id 
        const relatedBlog = await Blog.find({category: categoryId, slug:{ $ne: blog}}).lean().exec()
        res.status(200).json({
            relatedBlog
        })
    } catch (error) {
        next(handleError(500,error.message))
    }
}

export const getBlogByCategory = async (req, res, next)=> {
    try {
        const {category} = req.params
        const categoryData = await Category.findOne({slug: category})
        if(!categoryData){
            next(handleError(404,'Category data not found'))
        }
        const categoryId = categoryData._id 
        const blog = await Blog.find({category: categoryId}).populate('auther', 'name avatar role').populate('category', 'name slug').sort({createdAt: -1}).lean().exec()
        res.status(200).json({
            blog, categoryData
        })
    } catch (error) {
        next(handleError(500,error.message))
    }
}


export const search = async (req, res, next)=> {
    try {
        const {q} = req.query 
        console.log(q)
        const blog = await Blog.find({title: {$regex: q, $options:'i'}}).populate('auther', 'name avatar role').populate('category', 'name slug').sort({createdAt: -1}).lean().exec()
        res.status(200).json({
            blog
        })
    } catch (error) {
        next(handleError(500,error.message))
    }
}