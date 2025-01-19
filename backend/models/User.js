const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    aadharId: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    hasVoted: {
        type: Boolean,
        default: false,
    },
    votedParty: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Party',
        default: null,
    },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
