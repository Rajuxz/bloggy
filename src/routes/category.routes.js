import { Router } from "express"
import { verifyJwt } from "../middlewares/auth.middlewares.js"
import {
    addCategory,
    deleteCategory,
    getAllCategories,
    updateCategory,
    activateCategory,
    getDeactivatedCategory,
} from "../controllers/category.controllers.js"
const router = Router()

//use verifyJwt middleware in all the routes.

router.route("/add-category").post(verifyJwt, addCategory)
router.route("/remove-category").post(verifyJwt, deleteCategory)
router.route("/:id").patch(verifyJwt, updateCategory)
router.route("/").get(getAllCategories)
router.route("/deactivated").get(verifyJwt, getDeactivatedCategory)
router.route("/").patch(verifyJwt, activateCategory)

export default router
