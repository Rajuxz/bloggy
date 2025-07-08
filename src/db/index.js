import mongoose from "mongoose"
import { DB_NAME } from "../constants.js"

const connectDatabase = async () => {
    try {
        const connectionInstance = await mongoose.connect(
            `${process.env.MONGODB_URI}/${DB_NAME}`
        )

        console.log(
            `\nDatabase Connected Successfully. ${connectionInstance.connection.host} `
        )
    } catch (error) {
        console.log(`Ex: While connecting database:${error.message}`)
    }
}

export default connectDatabase
