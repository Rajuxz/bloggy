import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import errorMiddleware from "./middlewares/error.middlewares.js"
const app = express()
app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    })
)
app.use(express.json({ limit: "50kb" }))
app.use(express.urlencoded({ extended: true, limit: "50kb" }))
app.use(express.static("public"))
app.use(cookieParser())

import adminRouter from "./routes/admin.routes.js"
import categoryRouter from "./routes/category.routes.js"
import postRouter from "./routes/post.routes.js"
import dashboardRouter from "./routes/dashboard.routes.js"
app.use("/api/v1/admin", adminRouter)
app.use("/api/v1/category", categoryRouter)
app.use("/api/v1/post", postRouter)
app.use("/api/v1/dashboard", dashboardRouter)
app.use(errorMiddleware)
export { app }
