const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register/intern', authController.internRegister);
router.post('/login/intern', authController.internLogin);
router.post('/register/organization', authController.organizationRegister);
router.post('/login/organization', authController.organizationLogin);


module.exports = router;


