// const Candidate = require('../models/Party');


// exports.addCandidate = async (req, res) => {
//     try {
//         const { name } = req.body;

//         // Create a new candidate
//         const newCandidate = new Candidate({ name });
//         await newCandidate.save();

//         res.status(201).json({ message: 'Candidate added successfully' });
//     } catch (error) {
//         res.status(500).json({ message: 'Server error', error: error.message });
//     }
// };

// exports.getCandidates = async (req, res) => {
//     try {
//         const candidates = await Candidate.find();
//         res.status(200).json(candidates);
//     } catch (error) {
//         res.status(500).json({ message: 'Server error', error: error.message });
//     }
// };

const Party = require('../models/Party');
const Vote = require('../models/Vote');

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