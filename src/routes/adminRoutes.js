const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.post('/login', adminController.adminLogin);
router.delete('/interns/:id', adminController.deleteIntern);
router.delete('/organizations/:id', adminController.deleteOrganization);
router.delete('/posts/:id', adminController.deleteInternshipPost);

module.exports = router;
