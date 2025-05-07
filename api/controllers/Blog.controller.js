import cloudinary from "../config/Cloudnary.js";
import { handleError } from "../helpers/handleError.js";
import Blog from "../models/blog.model.js";
import {encode} from 'entities'

export const addBlog = async (req, res, next)=> {
    try {
        const data = JSON.parse(req.body.data)
        let featuredImage = ''
         if(req.file){
              // Upload an image
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
              // Upload an image
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