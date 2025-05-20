const mongoose = require('mongoose');
const Report = require('../models/Report');
const User = require('../models/User');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

// Configure storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, '../uploads');
    // Create directory if doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const filetypes = /pdf|jpg|jpeg|png/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only PDF, JPG, JPEG, and PNG files are allowed!'), false);
    }
  }
}).single('file');

// Replace the uploadReport function with this:
exports.uploadReport = (req, res) => {
  upload(req, res, async function(err) {
    if (err) {
      console.error('File upload error:', err);
      return res.status(400).json({ message: err.message });
    }
    
    try {
      // Debug the request body to see what's coming in
      console.log('Upload request body:', req.body);
      
      // If no file but JSON data, it might be a manual report
      if (!req.file) {
        console.log('Manual data submission detected via upload route');
        const { title, type } = req.body;
        
        // Parse special fields that might be sent as strings
        let biomarkers, examination, imaging, vaccination;
        
        try {
          if (req.body.biomarkers) {
            biomarkers = typeof req.body.biomarkers === 'string' 
              ? JSON.parse(req.body.biomarkers) 
              : req.body.biomarkers;
          }
          
          if (req.body.examination) {
            examination = typeof req.body.examination === 'string' 
              ? JSON.parse(req.body.examination) 
              : req.body.examination;
          }
          
          if (req.body.imaging) {
            imaging = typeof req.body.imaging === 'string'
              ? JSON.parse(req.body.imaging)
              : req.body.imaging;
          }
          
          if (req.body.vaccination) {
            vaccination = typeof req.body.vaccination === 'string'
              ? JSON.parse(req.body.vaccination)
              : req.body.vaccination;
          }
        } catch (parseError) {
          console.error('Error parsing JSON data:', parseError);
          // Continue with what we have
        }
        
        if (!title || !type) {
          return res.status(400).json({ message: 'Title and type are required' });
        }
        
        const newReport = new Report({
          user: req.user.id,
          title,
          type,
          manualEntry: true,
          status: 'uploaded',
          date: new Date()
        });
        
        // Add specific data based on type
        if (biomarkers) newReport.biomarkers = biomarkers;
        if (examination) newReport.examination = examination;
        if (imaging) newReport.imaging = imaging;
        if (vaccination) newReport.vaccination = vaccination;
        
        await newReport.save();
        console.log('Manual report saved via upload:', newReport);
        
        // IMPORTANT: Add this to trigger analysis for manual data
        setTimeout(async () => {
          try {
            await analyzeReport(newReport._id);
          } catch (error) {
            console.error('Analysis error:', error);
          }
        }, 1000);
        
        return res.status(201).json({
          message: 'Report data saved successfully',
          reportId: newReport._id
        });
      }
      
      // Handle file upload
      const { title, type } = req.body;
      
      const newReport = new Report({
        user: req.user.id,
        title: title || req.file.originalname,
        type: type || 'other',
        fileUrl: `/uploads/${req.file.filename}`,
        status: 'uploaded',
        date: new Date(),
        // Add these new fields
        originalFileName: req.file.originalname,
        fileSize: req.file.size,
        mimeType: req.file.mimetype,
        category: req.body.category || 'other',
        provider: req.body.provider || ''
      });
      
      await newReport.save();
      console.log('File report saved:', newReport);
      
      // Process the report in the background (ensure this happens)
      setTimeout(async () => { 
        try {
          await analyzeReport(newReport._id);
        } catch (error) {
          console.error('Analysis error:', error);
        }
      }, 1000);
      
      res.status(201).json({
        message: 'Report uploaded successfully',
        reportId: newReport._id
      });
    } catch (error) {
      console.error('Report save error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
};

// Update submitManualReport to better handle the incoming data
exports.submitManualReport = async (req, res) => {
  try {
    console.log('Manual report submission - full body:', req.body);
    
    const { title, type, date, biomarkers, examination, imaging, vaccination } = req.body;
    
    if (!title) {
      return res.status(400).json({ message: 'Report title is required' });
    }
    
    if (!type) {
      return res.status(400).json({ message: 'Report type is required' });
    }
    
    // Create a new report document
    const report = new Report({
      user: req.user.id,
      title,
      type,
      date: date ? new Date(date) : new Date(),
      status: 'uploaded',
      manualEntry: true
    });
    
    // Helper function to safely parse JSON or use object directly
    const safelyParseData = (data) => {
      if (!data) return undefined;
      if (typeof data === 'string') {
        try {
          return JSON.parse(data);
        } catch (e) {
          console.error('Error parsing JSON:', e);
          return data;
        }
      }
      return data;
    };
    
    // Add specific data based on type
    if (biomarkers) report.biomarkers = safelyParseData(biomarkers);
    if (examination) report.examination = safelyParseData(examination);
    if (imaging) report.imaging = safelyParseData(imaging);
    if (vaccination) report.vaccination = safelyParseData(vaccination);
    
    await report.save();
    console.log('Manual report saved with ID:', report._id);
    
    // Start analysis in the background
    setTimeout(async () => {
      try {
        await analyzeReport(report._id);
      } catch (error) {
        console.error('Analysis error:', error);
      }
    }, 1000);
    
    res.status(201).json({
      message: 'Report submitted successfully',
      reportId: report._id
    });
  } catch (error) {
    console.error('Manual report submission error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Change this to match the route
exports.getUserReports = async (req, res, next) => {
  try {
    const reports = await Report.find({ user: req.user.id })
      .sort({ date: -1 })
      .select('_id title type date status analysis');
    
    res.json(reports);
  } catch (error) {
    next(error);
  }
};

// Change this to match the route
exports.getReport = async (req, res, next) => {
  try {
    const report = await Report.findById(req.params.id);
    
    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }
    
    if (report.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to access this report' });
    }
    
    res.json(report);
  } catch (error) {
    next(error);
  }
};

// Remove this function or rename it
exports.getReportStats = async (req, res, next) => {
  // This function is duplicating functionality and causing confusion
  // Either delete it or rename it
};

// Keep this one, which is properly named to match your route
exports.getDashboardStats = async (req, res) => {
  try {
    // Get total reports count
    const totalReports = await Report.countDocuments({ user: req.user.id });
    
    // Calculate health score (average of all reports with scores)
    const scoreResults = await Report.aggregate([
      { $match: { 
        user: new mongoose.Types.ObjectId(req.user.id),
        'analysis.healthScore': { $exists: true } 
      }},
      { $group: { 
        _id: null, 
        averageScore: { $avg: '$analysis.healthScore' } 
      }}
    ]);
    
    const healthScore = scoreResults.length > 0 ? Math.round(scoreResults[0].averageScore) : 0;
    
    // Count risk factors
    const riskFactors = await Report.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(req.user.id) } },
      { $unwind: { path: '$analysis.riskFactors', preserveNullAndEmptyArrays: false } },
      { $count: 'total' }
    ]);
    
    const riskCount = riskFactors.length > 0 ? riskFactors[0].total : 0;
    
    // Next checkup date - default 30 days
    const nextCheckup = 30;
    
    res.json({
      totalReports,
      healthScore,
      riskFactors: riskCount,
      nextCheckup
    });
  } catch (error) {
    console.error('Error getting dashboard stats:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Add this function to reportController.js
exports.downloadReport = async (req, res, next) => {
  try {
    const report = await Report.findById(req.params.id);
    
    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }
    
    if (report.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to access this report' });
    }
    
    if (!report.fileUrl) {
      return res.status(404).json({ message: 'No file associated with this report' });
    }
    
    // Get file path - strip leading slash if present
    const filePath = path.join(__dirname, '..', report.fileUrl.replace(/^\//, ''));
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: 'File not found on server' });
    }
    
    // Set appropriate filename for download
    const fileName = report.title + path.extname(filePath);
    
    // Set content disposition header for download
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
    
    // Stream the file to the client
    res.sendFile(filePath);
  } catch (error) {
    next(error);
  }
};

// Helper function to analyze reports
async function analyzeReport(reportId) {
  try {
    console.log('Starting analysis for report:', reportId);
    
    // Update report status to processing
    await Report.findByIdAndUpdate(reportId, { status: 'processing' });
    
    // Get the report data
    const report = await Report.findById(reportId);
    if (!report) {
      console.error('Report not found for analysis');
      return;
    }

    console.log('Analyzing report data:', JSON.stringify(report, null, 2));
    
    // Initialize analysis object with default values
    let analysis = {
      healthScore: 85, // Default score
      findings: [],
      recommendations: [],
      riskFactors: []
    };
    
    // Helper function to safely parse a value regardless of format
    const parseValue = (value) => {
      if (!value) return null;
      
      // If value is an object with a value property (from manual entry)
      if (typeof value === 'object' && value.value !== undefined) {
        return parseFloat(value.value);
      }
      
      // If value is a string (from direct entry)
      if (typeof value === 'string') {
        const parsed = parseFloat(value);
        return isNaN(parsed) ? null : parsed;
      }
      
      // If value is already a number
      return typeof value === 'number' ? value : null;
    };
    
    // Analyze based on report type and actual data
    if (report.type === 'blood_work' && report.biomarkers) {
      // Blood work analysis using real data
      const biomarkers = report.biomarkers;
    
      // Blood glucose analysis
      const glucoseVal = parseValue(biomarkers.glucose);
      if (glucoseVal) {
        if (glucoseVal > 100) {
          analysis.findings.push(`Elevated glucose level: ${glucoseVal} mg/dL`);
          analysis.recommendations.push('Consider dietary adjustments to manage blood glucose');
          analysis.riskFactors.push({
            name: 'Elevated glucose',
            level: glucoseVal > 125 ? 'high' : 'medium'
          });
          analysis.healthScore -= 5;
        } else if (glucoseVal > 70 && glucoseVal <= 100) {
          analysis.findings.push(`Normal glucose level: ${glucoseVal} mg/dL`);
        } else if (glucoseVal <= 70) {
          analysis.findings.push(`Low glucose level: ${glucoseVal} mg/dL`);
          analysis.recommendations.push('Consult with healthcare provider about low glucose levels');
          analysis.riskFactors.push({
            name: 'Low blood glucose',
            level: 'medium'
          });
          analysis.healthScore -= 3;
        }
      }
      
      // Cholesterol analysis
      const cholesterol = parseValue(biomarkers.totalCholesterol);
      if (cholesterol) {
        if (cholesterol > 200) {
          analysis.findings.push(`Elevated total cholesterol: ${cholesterol} mg/dL`);
          analysis.recommendations.push('Consider dietary changes to manage cholesterol');
          analysis.riskFactors.push({
            name: 'High cholesterol',
            level: cholesterol > 240 ? 'high' : 'medium'
          });
          analysis.healthScore -= 6;
        } else {
          analysis.findings.push(`Healthy total cholesterol: ${cholesterol} mg/dL`);
        }
      }
      
      // HDL Cholesterol
      const hdl = parseValue(biomarkers.hdl);
      if (hdl) {
        if (hdl < 40) {
          analysis.findings.push(`Low HDL (good) cholesterol: ${hdl} mg/dL`);
          analysis.recommendations.push('Increase physical activity to improve HDL levels');
          analysis.healthScore -= 4;
        } else {
          analysis.findings.push(`Good HDL cholesterol level: ${hdl} mg/dL`);
        }
      }
      
      // Complete blood count analysis
      const hgb = parseValue(biomarkers.hemoglobin);
      if (hgb) {
        if (hgb < 12) {
          analysis.findings.push(`Low hemoglobin: ${hgb} g/dL`);
          analysis.recommendations.push('Consider iron supplementation after consulting with doctor');
          analysis.riskFactors.push({
            name: 'Anemia risk',
            level: 'medium'
          });
          analysis.healthScore -= 5;
        } else if (hgb > 18) {
          analysis.findings.push(`Elevated hemoglobin: ${hgb} g/dL`);
          analysis.recommendations.push('Follow up with healthcare provider');
          analysis.healthScore -= 3;
        } else {
          analysis.findings.push(`Normal hemoglobin level: ${hgb} g/dL`);
        }
      }
      
      // Add analysis for other blood work parameters as needed

    } else if (report.type === 'physical_exam' && report.examination) {
      // Physical examination analysis
      const examination = report.examination;
      
      // Blood pressure analysis
      const systolic = parseValue(examination.systolicBP);
      const diastolic = parseValue(examination.diastolicBP);
      
      if (systolic && diastolic) {
        if (systolic >= 140 || diastolic >= 90) {
          analysis.findings.push(`Elevated blood pressure: ${systolic}/${diastolic} mmHg`);
          analysis.recommendations.push('Monitor blood pressure regularly');
          analysis.recommendations.push('Consider lifestyle modifications for blood pressure management');
          analysis.riskFactors.push({
            name: 'Hypertension',
            level: (systolic >= 160 || diastolic >= 100) ? 'high' : 'medium'
          });
          analysis.healthScore -= 7;
        } else if (systolic >= 120 || diastolic >= 80) {
          analysis.findings.push(`Borderline blood pressure: ${systolic}/${diastolic} mmHg`);
          analysis.recommendations.push('Monitor blood pressure periodically');
          analysis.healthScore -= 3;
        } else {
          analysis.findings.push(`Normal blood pressure: ${systolic}/${diastolic} mmHg`);
        }
      }
      
      // Calculate and analyze BMI if we have height and weight
      const height = parseValue(examination.height);
      const weight = parseValue(examination.weight);
      
      if (height && weight) {
        const heightInMeters = height / 100;
        const calculatedBMI = weight / (heightInMeters * heightInMeters);
        const bmi = parseFloat(calculatedBMI.toFixed(1));
        
        if (bmi < 18.5) {
          analysis.findings.push(`BMI indicates underweight: ${bmi}`);
          analysis.recommendations.push('Consider nutritional consultation');
          analysis.healthScore -= 3;
        } else if (bmi >= 25 && bmi < 30) {
          analysis.findings.push(`BMI indicates overweight: ${bmi}`);
          analysis.recommendations.push('Consider weight management strategies');
          analysis.healthScore -= 4;
        } else if (bmi >= 30) {
          analysis.findings.push(`BMI indicates obesity: ${bmi}`);
          analysis.recommendations.push('Consult with healthcare provider about weight management');
          analysis.riskFactors.push({
            name: 'Obesity',
            level: bmi >= 35 ? 'high' : 'medium'
          });
          analysis.healthScore -= 8;
        } else {
          analysis.findings.push(`Healthy BMI: ${bmi}`);
        }
      }
      
      // Add analysis for other physical exam parameters

    } // Continue with other report types...
    
    // Rest of the function remains the same
    // If no findings were added, add a default finding
    if (analysis.findings.length === 0) {
      analysis.findings.push('No specific findings from the submitted data');
    }
    
    // If no recommendations were added, add default recommendations
    if (analysis.recommendations.length === 0) {
      analysis.recommendations.push('Continue regular check-ups with healthcare provider');
      analysis.recommendations.push('Maintain a balanced diet and regular exercise');
    }
    
    // Ensure health score stays within bounds
    analysis.healthScore = Math.max(50, Math.min(99, analysis.healthScore));
    
    // Update report with analysis results
    await Report.findByIdAndUpdate(reportId, {
      status: 'analyzed',
      analysis: analysis,
      analyzedAt: new Date()
    });
    
    console.log('Analysis completed for report:', reportId);
  } catch (error) {
    console.error('Error analyzing report:', error);
    
    // Update report status to error
    await Report.findByIdAndUpdate(reportId, { status: 'error' });
  }
}