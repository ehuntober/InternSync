// routes/students.js
const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

// Define routes for students
router.get('/', studentController.getAll);
router.get('/:id', studentController.getById);
router.post('/', studentController.create);
router.put('/:id', studentController.update);
router.delete('/:id', studentController.delete);



// POST route for student internship application
router.post('/apply', studentController.applyForInternship);


module.exports = router;
