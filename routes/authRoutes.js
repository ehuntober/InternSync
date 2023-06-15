const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');


// POST route for student login
routers.post('/login', authController.login)

module.exports = router;