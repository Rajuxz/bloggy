import { v2 as cloudinary } from "cloudinary"
import fs from "fs"
import { DEFAULT_COVER_IMAGE } from "../constants.js"
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
        // console.log("File Uploaded to cloudinary.", response.url)
        fs.unlinkSync(localFilePath)
        return response
    } catch (error) {
        //if file is not uploaded.
        fs.unlinkSync(localFilePath) //remove locally saved temprorary files as upload failed.
        return null
    }
}
const deleteFromCloudinary = async (url) => {
    try {
        if (!url || url === DEFAULT_COVER_IMAGE) return null
        // console.log("to Delete: ", url)
        const id = extractImageId(url)
        if (!id) return null
        const response = await cloudinary.uploader.destroy(id)
        // console.log("After deleting", response)

        return response
    } catch (error) {
        console.log("Cloudinary deletion failed.", error)
        return error
    }
}

const extractImageId = (url) => {
    //if image is not from cloudinary
    if (!url.includes("cloudinary")) return null
    //get array of part of url
    const parts = url.split("/")
    //search the version starts with v
    const versionIndex = parts.findIndex((part) => /^v\d+$/.test(part))
    if (versionIndex == -1) return null
    //if version is found, take everything after version
    //this gives my-folder/xyz.png
    const publicIdWithExt = parts.slice(versionIndex + 1).join("/")
    //get and remove extension
    const dotIndex = publicIdWithExt.lastIndexOf(".")
    return dotIndex !== -1
        ? publicIdWithExt.substring(0, dotIndex) //remove extension
        : publicIdWithExt //return as it is.
}

export { uploadOnCloudinary, deleteFromCloudinary, extractImageId }
