const errorMiddleware = (err, req, res, next) => {
    console.error("💥 Error caught by global middleware")

    // Basic info
    console.error("➡️ Name:", err.name)
    console.error("➡️ Message:", err.message)
    console.error("➡️ Status Code:", err.statusCode || 500)

    // Full stack trace
    if (err.stack) {
        console.error("➡️ Stack Trace:\n", err.stack)
    }

    // If the error contains 'errors' (like from Mongoose or express-validator)
    if (err.errors && Object.keys(err.errors).length > 0) {
        console.error(
            "➡️ Validation/Field Errors:",
            JSON.stringify(err.errors, null, 2)
        )
    }

    // If custom data was passed
    if (err.data) {
        console.error("➡️ Custom Data:", JSON.stringify(err.data, null, 2))
    }

    // If there's a 'cause' (Node 16+ error chaining)
    if (err.cause) {
        console.error("➡️ Cause:", err.cause)
    }

    // Deep inspection of the whole error object (shows hidden nested values)
    console.error(
        "🧠 Full Error Object:\n",
        util.inspect(err, { depth: null, colors: true })
    )

    // Respond to the client
    return res.status(err.statusCode || 500).json({
        statusCode: err.statusCode || 500,
        success: false,
        message: err.message || "Internal Server Error",
        data: null,
        errors: err.errors || [],
    })
}

export default errorMiddleware
