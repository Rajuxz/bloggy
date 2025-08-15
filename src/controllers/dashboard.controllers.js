import { ApiResponse } from "../utils/ApiResponse.js"
import asyncHandler from "../utils/asyncHandler.js"
const getPostData = asyncHandler(async (req, res) => {
    return new ApiResponse(200, "Here's the list of posts.")
})

export { getPostData }
