const jwt = require('jsonwebtoken');
const config = require('../config/config');

exports.authenticateToken = (req, res, next) => {
    // Get token from header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Format: "Bearer TOKEN"

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, config.jwtSecret);

        // Add user from payload
        req.user = { id: decoded.id };
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Invalid token' });
    }
};