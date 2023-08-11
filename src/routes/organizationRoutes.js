const express = require('express');
const router = express.Router();
const organizationAuthMiddleware = require('../middleware/authMiddleware');
const organizationController = require('../controllers/organizationController');

// Route to get all organizations
router.get('/', organizationAuthMiddleware, organizationController.getAllOrganizations);

module.exports = router;
