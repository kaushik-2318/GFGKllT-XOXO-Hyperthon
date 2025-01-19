const express = require('express');
const { addParty, viewVotes, deleteParty, loginAdmin, registerAdmin } = require('../controllers/adminController');
const adminMiddleware = require('../middleware/adminMiddleware');

const router = express.Router();

// Admin-only routes
router.post('/add-party', adminMiddleware, addParty);
router.get('/view-votes', adminMiddleware, viewVotes);
router.delete('/delete-party', adminMiddleware, deleteParty);

// Admin authentication routes
router.post('/login', loginAdmin); // Admin login
router.post('/register', registerAdmin); // Admin registration (optional)

module.exports = router;
