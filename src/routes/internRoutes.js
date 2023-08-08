const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const internController = require('../controllers/internController');

// Auth middleware to ensure only authenticated interns can access their profiles
router.use(authMiddleware);

router.put('/:id', internController.updateInternProfile);

module.exports = router;
