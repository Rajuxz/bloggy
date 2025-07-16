import { ApiResponse } from "../utils/ApiResponse.js"
import ApiError from "../utils/ApiError.js"
import asyncHandler from "../utils/asyncHandler.js"
import { Admin } from "../models/admin.models.js"
import { Post } from "../models/post.models.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { Category } from "../models/category.models.js"
const addPost = asyncHandler(async (req, res) => {
    const { title, content, author, category, slug } = req.body
    // console.log(title, content, author, category)
    // Now we need author and category.
    //let's get user
    const adminExists = await Admin.exists({ _id: req.admin._id })
    console.log(adminExists)

    if (!adminExists) {
        throw new ApiError(401, "Admin not found. Hmm. Unauthorized access.")
    }

    const categoryExists = await Category.exists({ _id: category })
    if (!categoryExists) {
        throw new ApiError(404, "Category not found.")
    }

    const slugExists = await Post.findOne({ slug: slug })
    if (slugExists) {
        throw new ApiError(403, "Slug already exists.")
    }
    //let's fetch cover Image.
    let coverImage
    if (
        req.files &&
        Array.isArray(req.files.coverImage) &&
        req.files.coverImage[0]
    ) {
        const coverImageLocalPath = req.files.coverImage[0].path
        coverImage = await uploadOnCloudinary(coverImageLocalPath)
    }
    const postData = {
        title: title,
        content: content,
        author: author,
        category: category,
        slug: slug,
    }
    if (coverImage?.url) postData.coverImage = coverImage.url

    const post = await Post.create(postData)

    // console.log(`Post: ${post} `)
    const createdPost = await Post.findById(post._id).select(
        "-content -createdAt -updatedAt -author -category"
    )

    if (!createdPost) {
        throw new ApiError(500, "Cannot create post. Please try again later.")
    }

    return res
        .status(200)
        .json(new ApiResponse(200, createdPost, "Post added Successfully."))
})

const getPostBySlug = asyncHandler(async (req, res) => {
    const post = await Post.findOne({ slug: req.params.slug })
    if (!post) {
        throw new ApiError(404, "Post with given slug not found")
    }
    return res.status(200).json(new ApiResponse(200, post))
})
const getPostByAuthorId = asyncHandler(async (req, res) => {
    const authorId = req.params.authorId
    const postByUser = await Post.find({ author: authorId })
        .populate("category")
        .sort({ createdAt: -1 })

    return res.status(200).json(new ApiResponse(200, postByUser))
})

export { addPost, getPostBySlug, getPostByAuthorId }
