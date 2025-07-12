import { Router } from "express"
const router = Router()

import { upload } from "../middlewares/multer.middlewares.js"
import validator from "../middlewares/validator.middleware.js"
import registerAdmin from "../controllers/admin.controllers.js"
import { registerValidator } from "../validators/adminValidator.js"

router
    .route("/register")
    .post(
        upload.fields([{ name: "avatar", maxCount: 1 }]),
        registerValidator,
        validator,
        registerAdmin
    )

export default router
