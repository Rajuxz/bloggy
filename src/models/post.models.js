import mongoose from "mongoose"
import { Schema } from "mongoose"

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
            default:
                "https://res.cloudinary.com/dabfe0sla/image/upload/v1750850768/samples/cup-on-a-table.jpg",
        },
        views: {
            type: Number,
            default: 0,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        updatedAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true, // Auto-manage createdAt/updatedAt
    }
)

export const Post = mongoose.model("Post", postSchema)
