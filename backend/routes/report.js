const express = require('express');
const {
    getUserReports,
    getReport,
    uploadReport,
    getDashboardStats
} = require('../controllers/reportController');
const { authenticateToken } = require('../middleware/auth');
const { validateReport } = require('../middleware/validator');

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

// @route   GET /api/reports
// @desc    Get all user reports
// @access  Private
router.get('/', getUserReports);

// @route   GET /api/reports/stats
// @desc    Get user dashboard stats
// @access  Private
router.get('/stats', getDashboardStats);

// @route   GET /api/reports/:id
// @desc    Get a single report
// @access  Private
router.get('/:id', getReport);

// @route   POST /api/reports
// @desc    Upload a new report
// @access  Private
router.post('/', validateReport, uploadReport);

module.exports = router;