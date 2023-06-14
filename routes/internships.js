
const express = require('express')
const router = express.Router();
const internshipController = require('../controllers/internshipController');


// routes for internships
router.get('/', internshipController.getAll);
// router.get('/:id', internshipController.getById);
router.post('/',internshipController.create)
// router.put('/:id',internshipController.update);
// router.delete('/:id',internshipController.delete);

module.exports = router;