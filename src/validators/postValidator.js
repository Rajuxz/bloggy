// validators/postValidator.js
import { body } from "express-validator"
import mongoose from "mongoose"

export const validatePost = [
    body("title")
        .notEmpty()
        .withMessage("Title is required")
        .isString()
        .withMessage("Title must be a string")
        .bail()
        .trim()
        .isLength({ min: 3 })
        .withMessage("Title must be at least 3 characters long"),

    body("content")
        .notEmpty()
        .withMessage("Content is required")
        .bail()
        .isString()
        .withMessage("Content must be a string"),

    body("author")
        .notEmpty()
        .withMessage("Author is required")
        .bail()
        .custom((value) => mongoose.Types.ObjectId.isValid(value))
        .withMessage("Author must be a valid Mongo ID"),

    body("category")
        .notEmpty()
        .withMessage("Category is required")
        .bail()
        .custom((value) => mongoose.Types.ObjectId.isValid(value))
        .withMessage("Category must be a valid Mongo ID"),

    body("coverImage")
        .optional({ checkFalsy: true })
        .isURL()
        .withMessage("Cover image must be a valid URL"),

    body("slug")
        .notEmpty()
        .withMessage("Slug is required")
        .bail()
        .isString()
        .withMessage("Slug should be a text."),
]
