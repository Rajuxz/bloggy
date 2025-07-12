import { Admin } from "../models/admin.models.js"
import asyncHandler from "../utils/asyncHandler.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import ApiError from "../utils/ApiError.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"

const registerAdmin = asyncHandler(async (req, res) => {
    const { fullName, username, email, password } = req.body
    //check if username or email already exists.
    let userExists = await Admin.findOne({
        $or: [{ username, email }],
    })
    if (userExists) {
        throw new ApiError(409, "User already exists.")
    }
    const avatarLocalpath = req.files?.avatar[0]?.path
    let avatar
    if (avatarLocalpath) {
        avatar = await uploadOnCloudinary(avatarLocalpath)
    }

    //create admin
    const admin = await Admin.create({
        fullName,
        username: username.toLowerCase(),
        email,
        password,
        avatar: avatar.url || "",
    })
    const createdAdmin = await Admin.findById(admin._id).select(
        "-password -refreshToken"
    )
    if (!createdAdmin) {
        throw new ApiError(500, "Something went wrong while saving user.")
    }

    return res
        .status(201)
        .json(new ApiResponse(200, createdAdmin, "User Created Successfully."))
})

export default registerAdmin
