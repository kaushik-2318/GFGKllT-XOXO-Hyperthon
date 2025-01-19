const mongoose = require('mongoose');

const partySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    isParticipating: {
        type: Boolean,
        default: true // Admin can enable/disable participation
    },
}, { timestamps: true });

module.exports = mongoose.model('Party', partySchema);
