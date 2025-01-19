const errorMiddleware = (err, req, res, next) => {
    console.error(err.stack); // Log the error stack for debugging
    res.status(err.status || 500).json({
        message: err.message || 'Server Error',
        error: err.error || 'An unexpected error occurred',
    });
};

module.exports = errorMiddleware;