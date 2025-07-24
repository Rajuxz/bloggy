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
router.use(verifyJwt)

router.route("/add-category").post(addCategory)
router.route("/remove-category").post(deleteCategory)
router.route("/:id").patch(updateCategory)
router.route("/").get(getAllCategories)
router.route("/deactivated").get(getDeactivatedCategory)
router.route("/").patch(activateCategory)

export default router
