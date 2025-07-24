import asyncHandler from "../utils/asyncHandler.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { Category } from "../models/category.models.js"
import ApiError from "../utils/ApiError.js"
const addCategory = asyncHandler(async (req, res) => {
    //get name and slug.
    const { name, slug } = req.body
    //check if category exists or not.
    const categoryExists = await Category.find({
        $or: [{ name }, { slug }],
    })

    if (categoryExists.length > 0) {
        throw new ApiError(409, "Category already exists.")
    }

    const category = await Category.create({ name, slug })
    if (!category) {
        throw new ApiError(500, "Internal Server Error.")
    }
    return res
        .status(200)
        .json(
            new ApiResponse(200, { category }, "Category created successfully.")
        )
})

// Delete category.
const deleteCategory = asyncHandler(async (req, res) => {
    const { name } = req.body
    const category = await Category.find({ name: name })
    // console.log(category)
    if (!category || category.isActive === false) {
        throw new ApiError(404, "Category not found.")
    }

    category.isActive = false
    await category.save()
    return res
        .status(200)
        .json(new ApiResponse(200, "Category Deleted Successfully."))
})
// Update category

const updateCategory = asyncHandler(async (req, res) => {
    //to check if id is valid or not.
    if (!Category.isValidId(req.params.id)) {
        throw new ApiError(400, "Invalid id given.")
    }
    //get data to update.
    const { name, slug } = req.body
    //find category using id.
    //if category is inActive, don't let user modify it.
    const category = await Category.findById(req.params.id)
    if (!category || !category.isActive) {
        throw new ApiError(404, "Category not found.")
    }

    // find keys to update.
    //logic, create an object to hold update parameters if it is not undefined.
    const dataToUpdate = {}
    if (name !== undefined && name !== "")
        dataToUpdate.name = name.toLowerCase()
    if (slug !== undefined && slug !== "") dataToUpdate.slug = slug

    if (Object.keys(dataToUpdate).length === 0) {
        throw new ApiError(400, "No valid data is provided to update.")
    }
    // findByIdAndUpdate
    const updatedCategory = await Category.findByIdAndUpdate(
        req.params.id,
        dataToUpdate,
        {
            new: true,
            runValidators: true,
        }
    )

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                updatedCategory,
                "Category Updated Successfully."
            )
        )
})

//all categories.
const getAllCategories = asyncHandler(async (_, res) => {
    const categories = await Category.find({ isActive: true })
    if (!categories.length) {
        throw new ApiError(404, "No record found.")
    }
    return res
        .status(200)
        .json(new ApiResponse(200, categories, "All Categories"))
})
//special: Get deactivated category
const getDeactivatedCategory = asyncHandler(async (_, res) => {
    const categories = await Category.find({ isActive: false })
    if (categories.length == 0) throw new ApiError(404, "No Categories Found.")
    return res.status(200).json(new ApiResponse(200, categories))
})

//special: re-activate category.
const activateCategory = asyncHandler(async (req, res) => {
    const { name } = req.body
    const category = await Category.findOne({ name: name })
    // console.log(category.isActive)
    if (!category || category.isActive)
        throw new ApiError(400, "Category is already active.")

    category.isActive = true
    await category.save()
    return res
        .status(200)
        .json(new ApiResponse(200, "Category activated successfully."))
})
export {
    addCategory,
    deleteCategory,
    updateCategory,
    getAllCategories,
    activateCategory,
    getDeactivatedCategory,
}
