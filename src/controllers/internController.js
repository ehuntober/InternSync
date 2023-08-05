const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Intern = require('../models/intern');

const createIntern = async (req, res) => {
  const { name, email, password, portfolioLink, profileLink, skills, education, experiences } = req.body;
  try {
    const existingIntern = await Intern.findOne({ email });
    if (existingIntern) {
      return res.status(400).json({ message: 'Email already registered as an intern.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newIntern = new Intern({
      name,
      email,
      password: hashedPassword,
      portfolioLink,
      profileLink,
      skills,
      education,
      experiences,
    });

    await newIntern.save();

    res.status(201).json({ message: 'Intern account created successfully.' });
  } catch (error) {
    console.error('Error creating intern:', error);
    res.status(500).json({ message: 'Failed to create intern account.' });
  }
};

const updateIntern = async (req, res) => {
  const { name, portfolioLink, profileLink, skills, education, experiences } = req.body;
  const internId = req.params.id;

  try {
    const updatedIntern = await Intern.findByIdAndUpdate(
      internId,
      {
        name,
        portfolioLink,
        profileLink,
        skills,
        education,
        experiences,
      },
      { new: true } // Return the updated document
    );

    if (!updatedIntern) {
      return res.status(404).json({ message: 'Intern not found.' });
    }

    res.json(updatedIntern);
  } catch (error) {
    console.error('Error updating intern:', error);
    res.status(500).json({ message: 'Failed to update intern.' });
  }
};

const getInternById = async (req, res) => {
  const internId = req.params.id;

  try {
    const intern = await Intern.findById(internId);
    if (!intern) {
      return res.status(404).json({ message: 'Intern not found.' });
    }

    res.json(intern);
  } catch (error) {
    console.error('Error getting intern by ID:', error);
    res.status(500).json({ message: 'Failed to get intern.' });
  }
};

// Add more methods as needed for listing all interns, deleting interns, etc.

module.exports = {
  createIntern,
  updateIntern,
  getInternById,
};
