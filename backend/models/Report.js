const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['blood_work', 'physical_exam', 'imaging', 'vaccination', 'other']
  },
  date: {
    type: Date,
    default: Date.now
  },
  fileUrl: String,
  manualEntry: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['uploaded', 'processing', 'analyzed', 'error'],
    default: 'uploaded'
  },
  analysis: {
    healthScore: Number,
    findings: [String],
    recommendations: [String],
    riskFactors: [{
      name: String,
      level: {
        type: String,
        enum: ['low', 'medium', 'high']
      }
    }]
  },
  // Enhanced fields for document management
    provider: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    enum: ['lab_results', 'imaging_results', 'visit_summary', 'prescription', 'discharge_summary', 'other'],
    default: 'other'
  },
  tags: [String],
  originalFileName: String,
  fileSize: Number,
  mimeType: String,
  isShared: {
    type: Boolean,
    default: false
  },
  sharedWith: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    accessLevel: {
      type: String,
      enum: ['view', 'download'],
      default: 'view'
    },
    sharedDate: {
      type: Date,
      default: Date.now
    }
  }],
  // Fields for different report types
  biomarkers: {
    hemoglobin: String,
    wbc: String,
    rbc: String,
    platelets: String,
    glucose: String,
    totalCholesterol: String,
    hdl: String,
    ldl: String,
    triglycerides: String,
    notes: String
  },
  examination: {
    systolicBP: String,
    diastolicBP: String,
    heartRate: String,
    weight: String,
    height: String,
    bmi: String,
    temperature: String,
    oxygenSaturation: String,
    notes: String
  },
  imaging: {
    imagingType: String,
    bodyRegion: String,
    findings: String,
    recommendations: String
  },
  vaccination: {
    vaccineName: String,
    manufacturer: String,
    lotNumber: String,
    administrationDate: String,
    nextDoseDate: String,
    administeredBy: String,
    notes: String
  },
  analyzedAt: Date,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Report', ReportSchema);