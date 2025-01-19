const Party = require('../models/Party');
const Vote = require('../models/Vote');

const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


// Admin login
exports.loginAdmin = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if admin exists
        const admin = await Admin.findOne({ username });
        if (!admin) {
            return res.status(400).json({ message: 'Admin not found' });
        }

        // Check password
        const isMatch = await admin.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ adminId: admin._id }, process.env.JWT_SECRET, {
            expiresIn: '1h', // Token expiration time
        });

        res.status(200).json({ token, adminId: admin._id });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Admin Registration (optional, depending on your needs)
exports.registerAdmin = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if admin already exists
        const adminExists = await Admin.findOne({ username });
        if (adminExists) {
            return res.status(400).json({ message: 'Admin already exists' });
        }

        // Create a new admin
        const newAdmin = new Admin({
            username,
            password,
        });

        // Save admin to the database
        await newAdmin.save();

        res.status(201).json({ message: 'Admin registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


exports.addParty = async (req, res) => {
    try {
        const { name } = req.body;

        const existingParty = await Party.findOne({ name });
        if (existingParty) return res.status(400).json({ message: 'Party already exists' });

        const newParty = new Party({ name });
        await newParty.save();

        res.status(201).json({ message: 'Party added successfully', party: newParty });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.viewVotes = async (req, res) => {
    try {
        const results = await Vote.aggregate([
            {
                $group: {
                    _id: '$partyId',
                    totalVotes: { $count: {} },
                },
            },
        ]);

        const detailedResults = await Promise.all(
            results.map(async (result) => {
                const party = await Party.findById(result._id);
                return {
                    partyName: party.name,
                    totalVotes: result.totalVotes,
                };
            })
        );

        res.status(200).json(detailedResults);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


exports.viewVotes = async (req, res) => {
    try {
        const results = await Vote.aggregate([
            {
                $group: {
                    _id: '$partyId',
                    totalVotes: { $count: {} },
                },
            },
        ]);

        const detailedResults = await Promise.all(
            results.map(async (result) => {
                const party = await Party.findById(result._id);
                return {
                    partyName: party.name,
                    totalVotes: result.totalVotes,
                };
            })
        );

        res.status(200).json(detailedResults);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.deleteParty = async (req, res) => {
    try {
        const { partyId } = req.body;

        const party = await Party.findById(partyId);
        if (!party) {
            return res.status(404).json({ message: 'Party not found' });
        }

        await Party.findByIdAndDelete(partyId);

        res.status(200).json({ message: 'Party deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};