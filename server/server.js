const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Complaint = require('./models/Complaint');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Load environment variables
require('dotenv').config();

// MongoDB Connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB Connected...');
        
        // Create indexes
        await Complaint.createIndexes();
        console.log('Complaint indexes created...');
    } catch (err) {
        console.error('MongoDB connection error:', err.message);
        process.exit(1);
    }
};

connectDB();

// Registration Route
app.post('/api/register', async (req, res) => {
    try {
        const { fullName, email, password, role } = req.body;
        console.log('Registration attempt:', { fullName, email, role });

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log('User already exists:', email);
            return res.status(400).json({ message: 'User already exists' });
        }

        // Normalize and validate role
        const normalizedRole = role ? role.toLowerCase() : 'student';
        console.log('Normalized role:', normalizedRole);

        const validRoles = ['student', 'warden', 'watchman'];
        if (!validRoles.includes(normalizedRole)) {
            console.log('Invalid role specified:', normalizedRole);
            return res.status(400).json({ message: 'Invalid role specified' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const user = new User({
            fullName,
            email,
            password: hashedPassword,
            role: normalizedRole // Use normalized role
        });

        const savedUser = await user.save();
        console.log('User registered successfully:', {
            id: savedUser._id,
            email: savedUser.email,
            role: savedUser.role
        });

        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: savedUser._id,
                email: savedUser.email,
                role: savedUser.role
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Check Role Route
app.post('/api/check-role', async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email }).select('role');
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ role: user.role });
    } catch (error) {
        console.error('Error checking role:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Login Route
app.post('/api/login', async (req, res) => {
    try {
        const { email, password, role } = req.body;

        if (!email || !password || !role) {
            return res.status(400).json({
                message: 'Please provide email, password, and role'
            });
        }

        // Find user and include password for validation
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return res.status(400).json({
                message: 'Email not found. Please check your email or register.'
            });
        }

        // Validate password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(400).json({
                message: 'Incorrect password. Please try again.'
            });
        }

        // Validate role match
        const normalizedRequestedRole = role.toLowerCase();
        const normalizedUserRole = user.role.toLowerCase();

        if (normalizedRequestedRole !== normalizedUserRole) {
            return res.status(403).json({
                message: `Access denied. You are not registered as a ${normalizedRequestedRole}.`
            });
        }

        // Prepare user data for response
        const userData = {
            id: user._id.toString(),
            fullName: user.fullName,
            email: user.email,
            role: normalizedUserRole
        };

        // Send success response
        res.status(200).json({
            message: 'Login successful',
            user: userData
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Complaint Routes

// Create a new complaint
app.post('/api/complaints', async (req, res) => {
    try {
        console.log('Received complaint request with body:', req.body);

        const { title, description, studentId } = req.body;

        // Validate required fields
        if (!title || !description || !studentId) {
            console.log('Missing required fields');
            return res.status(400).json({ 
                message: 'Title, description, and studentId are required'
            });
        }

        // Find the student user
        const student = await User.findById(studentId);
        if (!student) {
            console.log('Student not found:', studentId);
            return res.status(404).json({ message: 'Student not found' });
        }

        console.log('Found student:', student);

        // Create new complaint
        const complaint = new Complaint({
            title,
            description,
            studentName: student.fullName,
            room: student.room || 'Not Specified',
            priority: 'medium',
            contactNo: student.contactNo || 'Not Specified',
            email: student.email,
            student: student._id,
            status: 'pending',
            date: new Date(),
            wardenResponse: ''
        });

        console.log('Created complaint object:', complaint);

        try {
            const savedComplaint = await complaint.save();
            console.log('Saved complaint:', savedComplaint);

            res.status(201).json({
                message: 'Complaint submitted successfully',
                complaint: savedComplaint
            });
        } catch (saveError) {
            console.error('Error saving complaint:', saveError);
            throw saveError;
        }
    } catch (error) {
        console.error('Error creating complaint:', error);
        res.status(500).json({ message: 'Error submitting complaint', error: error.message });
    }
});

// Get all complaints (for warden)
app.get('/api/complaints', async (req, res) => {
    try {
        const { status, priority, search } = req.query;
        let query = {};

        // Filter by status if provided
        if (status && status !== 'all') {
            query.status = status;
        }

        // Filter by priority if provided
        if (priority && priority !== 'all') {
            query.priority = priority;
        }

        // Search in title, description, or student name
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
                { studentName: { $regex: search, $options: 'i' } },
                { room: { $regex: search, $options: 'i' } }
            ];
        }

        const complaints = await Complaint.find(query)
            .sort({ date: -1 })
            .populate('student', 'fullName email');

        res.json(complaints);
    } catch (error) {
        console.error('Error fetching complaints:', error);
        res.status(500).json({ message: 'Error fetching complaints', error: error.message });
    }
});

// Get complaints by student ID
app.get('/api/complaints/student/:studentId', async (req, res) => {
    try {
        console.log('Fetching complaints for student:', req.params.studentId);
        
        const complaints = await Complaint.find({ student: req.params.studentId })
            .sort({ date: -1 });
            
        console.log('Found complaints:', complaints.length);

        res.json(complaints);
    } catch (error) {
        console.error('Error fetching student complaints:', error);
        res.status(500).json({ message: 'Error fetching complaints', error: error.message });
    }
});

// Update complaint status
app.put('/api/complaints/:id', async (req, res) => {
    try {
        const { status, wardenResponse } = req.body;

        // Validate status
        if (!['pending', 'in-progress', 'resolved'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }

        const complaint = await Complaint.findByIdAndUpdate(
            req.params.id,
            { 
                status,
                wardenResponse,
                lastUpdated: new Date()
            },
            { new: true }
        );

        if (!complaint) {
            return res.status(404).json({ message: 'Complaint not found' });
        }

        res.json({
            message: 'Complaint updated successfully',
            complaint
        });
    } catch (error) {
        console.error('Error updating complaint:', error);
        res.status(500).json({ message: 'Error updating complaint', error: error.message });
    }
});

// Delete complaint
app.delete('/api/complaints/:id', async (req, res) => {
    try {
        const complaint = await Complaint.findByIdAndDelete(req.params.id);

        if (!complaint) {
            return res.status(404).json({ message: 'Complaint not found' });
        }

        res.json({ message: 'Complaint deleted successfully' });
    } catch (error) {
        console.error('Error deleting complaint:', error);
        res.status(500).json({ message: 'Error deleting complaint', error: error.message });
    }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
