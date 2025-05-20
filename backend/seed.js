require('dotenv').config({ path: '../.env' }); // Adjust path if needed
const mongoose = require('mongoose');
const User = require('./models/User');
const Report = require('./models/Report');

// Use the MongoDB URI directly from .env
const MONGO_URI = process.env.MONGODB_URI || 'mongodb+srv://apiyush385:N5RwYG3ANljXUcIB@medi-check.nkxda76.mongodb.net/?retryWrites=true&w=majority&appName=medi-check';

const seedData = async () => {
  try {
    console.log('Connecting to MongoDB with URI:', MONGO_URI);
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB Connected for seeding');

    // Create a test user if one doesn't exist
    let testUser = await User.findOne({ email: 'test@example.com' });
    if (!testUser) {
      testUser = new User({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123' // In a real app, hash this
      });
      await testUser.save();
      console.log('Test user created');
    }

    // Create sample reports
    await Report.deleteMany({ user: testUser._id }); // Clear existing test reports
    
    const reports = [
      {
        user: testUser._id,
        title: 'Annual Physical',
        type: 'physical_exam',
        date: new Date(),
        fileUrl: 'https://example.com/reports/physical.pdf',
        status: 'analyzed',
        analysis: {
          healthScore: 85,
          findings: ['Normal blood pressure', 'Good cholesterol levels'],
          recommendations: ['Continue regular exercise', 'Maintain balanced diet'],
          riskFactors: []
        },
        analyzedAt: new Date()
      },
      {
        user: testUser._id,
        title: 'Blood Test',
        type: 'blood_work',
        date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
        fileUrl: 'https://example.com/reports/blood.pdf',
        status: 'analyzed',
        analysis: {
          healthScore: 78,
          findings: ['Vitamin D deficiency', 'Normal blood cell counts'],
          recommendations: ['Vitamin D supplementation', 'Regular follow-up in 3 months'],
          riskFactors: [
            {
              name: 'Vitamin D deficiency',
              level: 'medium'
            }
          ]
        },
        analyzedAt: new Date()
      }
    ];
    
    await Report.insertMany(reports);
    console.log('Sample reports created');
    
    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    console.error(error.stack);
    process.exit(1);
  }
};

seedData();