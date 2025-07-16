import { Router } from "express"
import { verifyJwt } from "../middlewares/auth.middlewares.js"
import { upload } from "../middlewares/multer.middlewares.js"
import {
    addPost,
    getPostBySlug,
    getPostByAuthorId,
} from "../controllers/post.controllers.js"
import { validatePost } from "../validators/postValidator.js"
import validator from "../middlewares/validator.middleware.js"

const router = Router()

router.use(verifyJwt)

router
    .route("/")
    .post(
        upload.fields([{ name: "coverImage", maxCount: 1 }]),
        validatePost,
        validator,
        addPost
    )
router.route("/:slug").get(getPostBySlug)
router.route("/author/:authorId").get(getPostByAuthorId)
export default router
