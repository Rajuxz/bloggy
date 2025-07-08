import mongoose from "mongoose"
import { Schema } from "mongoose"

const categorySchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            lowercase: true,
            unique: true,
        },
        slug: {
            required: true,
            unique: true,
        },
    },
    { timestamps: true }
)

export const Category = mongoose.model("Category", categorySchema)
