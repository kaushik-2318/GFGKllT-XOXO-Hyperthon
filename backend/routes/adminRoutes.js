const express = require('express');
const { addParty, viewVotes, deleteParty } = require('../controllers/adminController');
const adminMiddleware = require('../middleware/adminMiddleware');

const router = express.Router();

router.post('/add-party', adminMiddleware, addParty);
// router.get('/view-votes', adminMiddleware, viewVotes);
// router.delete('/delete-party', adminMiddleware, deleteParty);

module.exports = router;