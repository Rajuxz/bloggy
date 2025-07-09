import { validationResult } from "express-validator"
import ApiError from "../utils/ApiError.js"

const validator = (req, res, next) => {
    // console.log("Routes jiii, Jane se pehle milke jaiyega.")
    // console.log(
    //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{6,}$/.test(
    //         req.body.password
    //     )
    // )
    const errors = validationResult(req)
    // console.log("Error mil gaya ", JSON.stringify(errors, null, 1))
    if (!errors.isEmpty()) {
        throw new ApiError(400, "Validation Error.", {
            errors: errors.array().map((err) => ({
                field: err.param,
                message: err.msg,
            })),
        })
    }
    next()
}

export default validator
