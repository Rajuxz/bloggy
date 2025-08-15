import { Router } from "express"
import { verifyJwt } from "../middlewares/auth.middlewares.js"
import { getPostData } from "../controllers/dashboard.controllers.js"
const router = Router()
router.use(verifyJwt)
router.route("/").get(getPostData)

export default router
