const express = require('express');
const {
    getUserReports,
    getReport,
    uploadReport,
    getDashboardStats,
    submitManualReport  // Make sure this is imported correctly
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
// @desc    Get report by ID
// @access  Private
router.get('/:id', getReport);

// Add this route to your report.js routes file
router.get('/:id/download', getReport);

// @route   POST /api/reports
// @desc    Upload file report
// @access  Private
router.post('/', uploadReport);

// @route   POST /api/reports/manual
// @desc    Submit manual report data
// @access  Private
router.post('/manual', submitManualReport);  // Make sure this route exists!

module.exports = router;