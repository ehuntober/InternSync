const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');


const adminAuthMiddleware = require('../middleware/adminAuthMiddleware');


router.post('/register', adminController.adminRegister);
router.post('/login', adminController.adminLogin);

// Admin-specific routes for deleting interns, organizations, and organization posts
router.delete('/interns/:id', adminAuthMiddleware, adminController.deleteIntern);
router.delete('/organizations/:id', adminAuthMiddleware, adminController.deleteOrganization);
router.delete('/posts/:id', adminAuthMiddleware, adminController.deleteInternshipPost);

module.exports = router;
