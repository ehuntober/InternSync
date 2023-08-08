const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const internshipPostController = require('../controllers/internshipPostController');

// Auth middleware to ensure only authenticated organizations can create posts
router.use(authMiddleware);

router.post('/:id/posts', internshipPostController.createInternshipPost);

module.exports = router;
