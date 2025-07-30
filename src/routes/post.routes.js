import { Router } from "express"
import { verifyJwt } from "../middlewares/auth.middlewares.js"
import { upload } from "../middlewares/multer.middlewares.js"
import {
    addPost,
    getPostBySlug,
    getPostByAuthorId,
    deletePost,
    getAllBlogs,
    updatePost,
} from "../controllers/post.controllers.js"
import { validatePost } from "../validators/postValidator.js"
import validator from "../middlewares/validator.middleware.js"

const router = Router()

router
    .route("/")
    .get(getAllBlogs)
    .post(
        verifyJwt,
        upload.fields([{ name: "coverImage", maxCount: 1 }]),
        validatePost,
        validator,
        addPost
    )
router.route("/author/:authorId").get(verifyJwt, getPostByAuthorId)
router.route("/:postId").delete(verifyJwt, deletePost)
router
    .route("/:slug")
    .get(getPostBySlug)
    .patch(upload.fields([{ name: "coverImage", maxCount: 1 }]), updatePost)

export default router
