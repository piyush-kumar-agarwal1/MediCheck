const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorHandler');
const config = require('./config/config');
const path = require('path');

// Import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const reportRoutes = require('./routes/report');

// Initialize express app
const app = express();

// Connect to database
connectDB();

// Middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors({
  origin: function (origin, callback) {
    const allowedOrigins = [
      'http://localhost:5173',
      'http://localhost:8081',
      'http://127.0.0.1:8081',
      'https://medi-check-psi.vercel.app',
      'http://localhost:3000'
    ];

    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log("Blocked by CORS:", origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(morgan('dev')); // Request logging
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Define Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/reports', reportRoutes);

// Error handling middleware (should be last)
app.use(errorHandler);

// Start server
const PORT = config.port || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));