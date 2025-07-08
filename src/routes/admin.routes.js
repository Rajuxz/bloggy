import { registerAdmin } from "../controllers/admin.controllers.js"

import { Router } from "express"
const router = Router()

router.route("/register").post(registerAdmin)

export default router
