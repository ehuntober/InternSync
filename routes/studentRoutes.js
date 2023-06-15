const express = require('express')
const router = express.Router();
const studentController = require('../controllers/studentController')

// route for student signup page
router.get('/signup', studentController.showSignupForm);

// post route for student signup
router.post('/signup',studentController.signup);

module.exports = router;
