// User registration validation
exports.validateUser = (req, res, next) => {
    const { name, email, password } = req.body;

    // Validate input fields
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Please provide a valid email address' });
    }

    // Validate password strength
    if (password.length < 6) {
        return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }

    next();
};

// Login validation
exports.validateLogin = (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Please provide email and password' });
    }

    next();
};

// Report validation
exports.validateReport = (req, res, next) => {
    const { title, type, fileUrl } = req.body;

    if (!title || !type || !fileUrl) {
        return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const validTypes = ['blood_work', 'physical_exam', 'imaging', 'dental', 'other'];
    if (!validTypes.includes(type)) {
        return res.status(400).json({ message: 'Invalid report type' });
    }

    next();
};

// Update profile validation
exports.validateUpdateProfile = (req, res, next) => {
    const { name, email } = req.body;

    if (!name && !email) {
        return res.status(400).json({ message: 'Please provide at least one field to update' });
    }

    if (email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Please provide a valid email address' });
        }
    }

    next();
};