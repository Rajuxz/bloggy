import { Router } from "express"
const router = Router()

import validator from "../middlewares/validator.middleware.js"
import { registerAdmin } from "../controllers/admin.controllers.js"
import { registerValidator } from "../validators/adminValidator.js"

router.route("/register").post(registerValidator, validator, registerAdmin)

export default router
