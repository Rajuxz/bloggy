import { Admin } from "../models/admin.models.js"
import asyncHandler from "../utils/asyncHandler.js"
import { ApiResponse } from "../utils/ApiResponse.js"

const registerAdmin = asyncHandler(async (req, res) => {
    const { fullName, username, email, password } = req.body
    console.log(fullName, username, email, password)
    return res.status(200).json(new ApiResponse(200, { id: 1 }, "Hello there"))
})

export { registerAdmin }
