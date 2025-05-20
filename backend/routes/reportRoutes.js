const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const { protect } = require('../middleware/authMiddleware');

// Protect all routes
router.use(protect);

// File upload route
router.post('/upload', reportController.uploadReport);

// Get all reports
router.get('/', reportController.getAllReports);

// Get report statistics
router.get('/stats', reportController.getReportStats);

// Get specific report
router.get('/:id', reportController.getReportById);

module.exports = router;