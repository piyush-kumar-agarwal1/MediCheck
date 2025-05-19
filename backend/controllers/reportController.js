const Report = require('../models/Report');
const User = require('../models/User');

// Get all reports for a user
exports.getUserReports = async (req, res, next) => {
    try {
        const reports = await Report.find({ user: req.user.id })
            .sort({ createdAt: -1 });

        res.json(reports);
    } catch (error) {
        next(error);
    }
};

// Get a single report
exports.getReport = async (req, res, next) => {
    try {
        const report = await Report.findById(req.params.id);

        // Check if report exists
        if (!report) {
            return res.status(404).json({ message: 'Report not found' });
        }

        // Check if the report belongs to the user
        if (report.user.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        res.json(report);
    } catch (error) {
        next(error);
    }
};

// Upload a new report
exports.uploadReport = async (req, res, next) => {
    try {
        // In a real implementation, the file would be uploaded to a storage service
        // and the URL would be saved to the database
        const { title, type, fileUrl } = req.body;

        const newReport = new Report({
            title,
            type,
            fileUrl,
            user: req.user.id
        });

        await newReport.save();

        // In a real application, you would trigger analysis here
        // This would typically be done asynchronously

        res.status(201).json({
            message: 'Report uploaded successfully',
            report: newReport
        });
    } catch (error) {
        next(error);
    }
};

// Get user dashboard stats
exports.getDashboardStats = async (req, res, next) => {
    try {
        // Count total reports
        const totalReports = await Report.countDocuments({ user: req.user.id });

        // Get latest report with analysis
        const latestReport = await Report.findOne({
            user: req.user.id,
            status: 'analyzed'
        }).sort({ analyzedAt: -1 });

        // Calculate average health score
        const reports = await Report.find({
            user: req.user.id,
            status: 'analyzed',
            'analysis.healthScore': { $exists: true }
        });

        let healthScore = 0;
        let riskFactors = 0;

        if (reports.length > 0) {
            const totalScore = reports.reduce((sum, report) => sum + report.analysis.healthScore, 0);
            healthScore = Math.round(totalScore / reports.length);

            // Count risk factors from latest report
            riskFactors = latestReport ? latestReport.analysis.riskFactors.length : 0;
        }

        res.json({
            totalReports,
            healthScore,
            riskFactors,
            // Calculate days until next checkup (mock data)
            nextCheckup: 15
        });
    } catch (error) {
        next(error);
    }
};