import { body } from "express-validator"

export const registerValidator = [
    //fullname
    body("fullName").notEmpty().withMessage("Name is required."),
    //username check
    body("username")
        .notEmpty()
        .withMessage("Username is required.")
        .isLength({ min: 4 })
        .withMessage("Username must be at least 4 character long."),
    //Check email here.
    body("email")
        .notEmpty() //required
        .withMessage("Email is required.")
        .isEmail() // Email need to be valid.
        .withMessage("Enter valid Email"),
    //check password
    body("password")
        .notEmpty()
        .withMessage("Password is required.")
        .isLength({ min: 6 })
        .withMessage("Too short password.")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/)
        .withMessage(
            "Password must include uppercase, lowercase, number, and symbol"
        ),
]

export const loginValidator = [
    //username or password
    body("identifier")
        .notEmpty()
        .withMessage("Either username or email is required."),

    //password
    body("password").notEmpty().withMessage("Password is required."),
]
