const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/register', adminController.adminRegister);
router.post('/login', adminController.adminLogin);

// Admin-specific routes for deleting interns, organizations, and organization posts
router.delete('/interns/:id', authMiddleware, adminController.deleteIntern);
router.delete('/organizations/:id', authMiddleware, adminController.deleteOrganization);
router.delete('/posts/:id', authMiddleware, adminController.deleteInternshipPost);

module.exports = router;
