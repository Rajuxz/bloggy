import connectDatabase from "./db/index.js"
import dotenv from "dotenv"
import { app } from "./app.js"

dotenv.config({ path: "./env" })

connectDatabase()
    .then(() => {
        app.listen(process.env.PORT || 2000, function () {
            console.log(
                `Server is running at: http://localhost:${process.env.PORT}`
            )
        })
    })
    .catch((error) => {
        console.log(
            "MongoDB Connection FAILED. Connect and try again later !",
            error
        )
    })
