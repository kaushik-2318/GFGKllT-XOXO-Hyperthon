const express = require('express');
const { submitVote } = require('../controllers/voteController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, submitVote);

module.exports = router;
