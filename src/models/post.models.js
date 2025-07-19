import mongoose from "mongoose"
import { Schema } from "mongoose"
import { DEFAULT_COVER_IMAGE } from "../constants.js"
const postSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        content: {
            type: String,
            required: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: "Admin", // Reference to the Admin model
            required: true,
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: "Category", // Reference to the Category model
            required: true,
        },
        like: {
            type: Number,
            default: 0,
        },
        coverImage: {
            type: String,
            default: DEFAULT_COVER_IMAGE,
        },
        views: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true, // Auto-manage createdAt/updatedAt
    }
)

postSchema.statics.isValid = (id) => {
    return mongoose.Schema.ObjectId.isValid(id)
}

export const Post = mongoose.model("Post", postSchema)
