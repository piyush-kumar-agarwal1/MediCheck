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
        enum: ['blood_work', 'physical_exam', 'imaging', 'dental', 'other']
    },
    date: {
        type: Date,
        default: Date.now
    },
    fileUrl: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['uploaded', 'processing', 'analyzed', 'error'],
        default: 'uploaded'
    },
    analysis: {
        healthScore: {
            type: Number,
            min: 0,
            max: 100
        },
        findings: [{
            type: String
        }],
        recommendations: [{
            type: String
        }],
        riskFactors: [{
            name: String,
            level: {
                type: String,
                enum: ['low', 'medium', 'high']
            }
        }]
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    analyzedAt: {
        type: Date
    }
});

module.exports = mongoose.model('Report', ReportSchema);