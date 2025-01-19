const Vote = require('../models/Vote');
const Candidate = require('../models/Party');


exports.submitVote = async (req, res) => {
    try {
        const { partyId } = req.body;
        const userId = req.user.id;

        const existingVote = await Vote.findOne({ userId });
        if (existingVote) return res.status(400).json({ message: 'You have already voted' });


        const newVote = new Vote({ userId, partyId });
        await newVote.save();

        res.status(201).json({ message: 'Vote submitted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};