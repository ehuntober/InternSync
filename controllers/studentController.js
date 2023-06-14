
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

// Apply for an internship
exports.applyForInternship = async (req, res) => {
  try {
    const { studentId, internshipId } = req.body;

    // Check if the student and internship exist
    const student = await Student.findById(studentId);
    const internship = await Internship.findById(internshipId);

    if (!student || !internship) {
      return res.status(404).json({ error: 'Student or internship not found' });
    }

    // Assign the internship to the student
    student.internship = internshipId;
    await student.save();

    res.status(200).json({ message: 'Internship application successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while processing the internship application' });
  }
};



