
const Student = require('../models/student');


exports.getAll = (req, res) => {

  Student.find()
    .then(students => {
      res.json(students);
    })
    .catch(err => {
      res.status(500).json({ error: 'An error occurred' });
    });
};

exports.getById = (req, res) => {

  const studentId = req.params.id;
  Student.findById(studentId)
    .then(student => {
      if (!student) {
        return res.status(404).json({ error: 'Student not found' });
      }
      res.json(student);
    })
    .catch(err => {
      res.status(500).json({ error: 'An error occurred' });
    });
};

exports.create = (req, res) => {
  // Logic to create a new student
  const studentData = req.body;
  Student.create(studentData)
    .then(student => {
      res.status(201).json(student);
    })
    .catch(err => {
      res.status(500).json({ error: 'An error occurred' });
    });
};

exports.update = (req, res) => {

  const studentId = req.params.id;
  const updatedData = req.body;
  Student.findByIdAndUpdate(studentId, updatedData, { new: true })
    .then(student => {
      if (!student) {
        return res.status(404).json({ error: 'Student not found' });
      }
      res.json(student);
    })
    .catch(err => {
      res.status(500).json({ error: 'An error occurred' });
    });
};

exports.delete = (req, res) => {

  const studentId = req.params.id;
  Student.findByIdAndDelete(studentId)
    .then(student => {
      if (!student) {
        return res.status(404).json({ error: 'Student not found' });
      }
      res.sendStatus(204);
    })
    .catch(err => {
      res.status(500).json({ error: 'An error occurred' });
    });
};

exports.applyForInternship = 



