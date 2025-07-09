
const errorMiddleware = (err, req, res, next) => {
    console.error("💥 Error caught by global middleware:", err)

    return res.status(err.statusCode || 500).json({
        statusCode: err.statusCode || 500,
        success: false,
        message: err.message || "Internal Server Error",
        data: null,
        errors: err.errors || [],
    })
}

export default errorMiddleware
