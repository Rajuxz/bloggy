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
            type: String,
            required: true,
            unique: true,
        },
    },
    { timestamps: true }
)

//to check if id is valid or not.
categorySchema.statics.isValidId = (id) => {
    return mongoose.Types.ObjectId.isValid(id)
}

export const Category = mongoose.model("Category", categorySchema)
