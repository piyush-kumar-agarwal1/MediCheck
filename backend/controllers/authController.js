const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('../config/config');
const express = require('express');
const { register, login, getCurrentUser } = require('../controllers/authController');
const { authenticateToken } = require('../middleware/auth');
const { validateUser, validateLogin } = require('../middleware/validator');

const router = express.Router();

// Register user
exports.register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(409).json({ message: 'User already exists' });
        }

        // Create new user
        user = new User({ name, email, password });
        await user.save();

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, config.jwtSecret, {
            expiresIn: config.jwtExpire
        });

        res.status(201).json({
            message: 'Registration successful',
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            },
            token
        });
    } catch (error) {
        next(error);
    }
};

// Login user
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Check if password matches
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, config.jwtSecret, {
            expiresIn: config.jwtExpire
        });

        res.json({
            message: 'Login successful',
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            },
            token
        });
    } catch (error) {
        next(error);
    }
};

// Get current user
exports.getCurrentUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({
            id: user._id,
            name: user.name,
            email: user.email
        });
    } catch (error) {
        next(error);
    }
};

// @route   POST /api/auth/register
// @desc    Register new user
// @access  Public
router.post('/register', validateUser, register);

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', validateLogin, login);

// @route   GET /api/auth/user
// @desc    Get user data
// @access  Private
router.get('/user', authenticateToken, getCurrentUser);

module.exports = router;