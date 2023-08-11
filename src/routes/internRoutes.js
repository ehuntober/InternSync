const express = require('express');
const router = express.Router();
const internAuthMiddleware = require('../middleware/internAuthMiddleware');
const internController = require('../controllers/internController');

// Auth middleware to ensure only authenticated interns can access their profiles
router.use(internAuthMiddleware);

router.put('/:id', internController.updateInternProfile);

module.exports = router;
