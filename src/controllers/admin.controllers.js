import { Admin } from "../models/admin.models.js"
import asyncHandler from "../utils/asyncHandler.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import ApiError from "../utils/ApiError.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"

const options = {
    httpOnly: true,
    secure: true,
    maxAge: 60 * 60 * 60 * 1280,
}

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

const loginAdmin = asyncHandler(async (req, res) => {
    const { identifier, password } = req.body
    //find user
    const admin = await Admin.findOne({
        $or: [{ username: identifier }, { email: identifier }],
    })

    if (!admin) {
        throw new ApiError(404, "User doesn't exists.")
    }
    const isPasswordValid = await admin.isPasswordCorrect(password)
    if (!isPasswordValid) {
        throw new ApiError(401, "Incorrect Password.")
    }
    //get refresh and access token.
    const { accessToken, refreshToken } = await getAccessAndRefreshToken(
        admin._id
    )
    const authorizedAdmin = await Admin.findById(admin._id).select(
        "-password -refreshToken"
    )

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    loggedInAdmin: authorizedAdmin,
                    accessToken,
                    refreshToken,
                },
                "User Created Successfully"
            )
        )
})

const getAccessAndRefreshToken = async (id) => {
    try {
        const admin = await Admin.findById(id)

        const accessToken = admin.generateAccessToken()
        const refreshToken = admin.generateRefreshToken()

        admin.refreshToken = refreshToken
        await admin.save({ validateBeforeSave: false })
        return { accessToken, refreshToken }
    } catch (error) {
        throw new ApiError(500, error?.message || "Something went wrong.")
    }
}

const logOutAdmin = asyncHandler(async (req, res) => {
    await Admin.findByIdAndUpdate(
        req.admin._id,
        {
            $set: { refreshToken: "" },
        },
        { new: true }
    )

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User Logged Out"))
})

export { registerAdmin, loginAdmin, logOutAdmin }
