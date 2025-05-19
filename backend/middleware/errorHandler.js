const { logger } = require('../utils/logger');

exports.errorHandler = (err, req, res, next) => {
    // Log error
    logger.error(`${err.name}: ${err.message}`, {
        method: req.method,
        path: req.path,
        error: err.stack
    });

    // Handle mongoose validation errors
    if (err.name === 'ValidationError') {
        const errors = Object.values(err.errors).map(error => error.message);
        return res.status(400).json({ message: 'Validation error', errors });
    }

    // Handle JWT errors
    if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({ message: 'Invalid token' });
    }

    // Handle expired JWT
    if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Token expired' });
    }

    // Handle duplicate key errors
    if (err.code === 11000) {
        return res.status(409).json({ message: 'Duplicate field value entered' });
    }

    // Send generic error response
    res.status(500).json({
        message: 'Server error',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
};