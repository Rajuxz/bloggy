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

app.use("/api/v1/admin", adminRouter)

app.use(errorMiddleware)
export { app }
