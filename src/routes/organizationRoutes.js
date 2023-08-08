const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const organizationController = require('../controllers/organizationController');

// Route to get all organizations
router.get('/', authMiddleware, organizationController.getAllOrganizations);

module.exports = router;
