import { Router } from "express"
const router = Router()

import { upload } from "../middlewares/multer.middlewares.js"
import validator from "../middlewares/validator.middleware.js"
import { verifyJwt } from "../middlewares/auth.middlewares.js"
import {
    loginAdmin,
    logOutAdmin,
    registerAdmin,
} from "../controllers/admin.controllers.js"
import {
    loginValidator,
    registerValidator,
} from "../validators/adminValidator.js"

router
    .route("/register")
    .post(
        upload.fields([{ name: "avatar", maxCount: 1 }]),
        registerValidator,
        validator,
        registerAdmin
    )

router.route("/login").post(loginValidator, validator, loginAdmin)
router.route("/logout").post(verifyJwt, logOutAdmin)

export default router
