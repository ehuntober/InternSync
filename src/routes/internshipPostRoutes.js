const express = require('express');
const router = express.Router();
const organizationAuthMiddleware = require('../middleware/organizationAuthMiddleware');
const internshipPostController = require('../controllers/internshipPostController');

// Auth middleware to ensure only authenticated organizations can create posts
router.use(organizationAuthMiddleware);

router.post('/:id/posts', internshipPostController.createInternshipPost);

module.exports = router;
