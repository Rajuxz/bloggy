import { v2 as cloudinary } from "cloudinary"
import fs from "fs"

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null

        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
        })
        //if file is uploaded.
        console.log("File Uploaded to cloudinary.", response.url)
        fs.unlinkSync(localFilePath)
        return response
    } catch (error) {
        //if file is not uploaded.
        fs.unlinkSync(localFilePath) //remove locally saved temprorary files as upload failed.
        return null
    }
}

export { uploadOnCloudinary }
