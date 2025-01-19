const Vote = require('../models/Vote');
const Party = require('../models/Party');

exports.submitVote = async (req, res) => {
    try {
        const { partyId } = req.body;
        const userId = req.user.id;

        // Check if the user has already voted
        const existingVote = await Vote.findOne({ userId });
        if (existingVote) return res.status(400).json({ message: 'You have already voted' });

        // Check if the party is participating
        const party = await Party.findById(partyId);
        if (!party || !party.isParticipating) {
            return res.status(400).json({ message: 'This party is not participating in the election' });
        }

        // Save the vote
        const newVote = new Vote({ userId, partyId });
        await newVote.save();

        res.status(201).json({ message: 'Vote submitted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
