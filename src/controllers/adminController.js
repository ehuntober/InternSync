require('dotenv').config();


const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');
const Intern = require('../models/intern');
const Organization = require('../models/organization');
const InternshipPost = require('../models/internshipPost');


const adminRegister = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Email already registered as an admin.' });
    }

    const newAdmin = new Admin({ name, email, password });
    await newAdmin.save();

    res.status(201).json({ message: 'Admin account created successfully.' });
  } catch (error) {
    console.error('Error registering admin:', error);
    res.status(500).json({ message: 'Failed to register admin.' });
  }
};

;


const adminLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    const token = jwt.sign({ user: admin }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error('Error logging in as admin:', error);
    res.status(500).json({ message: 'Login failed.' });
  }
};

const deleteIntern = async (req, res) => {
    const internId = req.params.id;
    try {
      const deletedIntern = await Intern.findByIdAndRemove(internId);
      if (!deletedIntern) {
        return res.status(404).json({ message: 'Intern not found.' });
      }
      res.json({ message: 'Intern deleted successfully.' });
    } catch (error) {
      console.error('Error deleting intern:', error);
      res.status(500).json({ message: 'Failed to delete intern.' });
    }
  };

const deleteOrganization = async (req, res) => {
  const organizationId = req.params.id;
  try {
    const deletedOrganization = await Organization.findByIdAndRemove(organizationId);
    if (!deletedOrganization) {
      return res.status(404).json({ message: 'Organization not found.' });
    }
    res.json({ message: 'Organization deleted successfully.' });
  } catch (error) {
    console.error('Error deleting organization:', error);
    res.status(500).json({ message: 'Failed to delete organization.' });
  }
};

const deleteInternshipPost = async (req, res) => {
  const postId = req.params.id;
  try {
    const deletedPost = await InternshipPost.findByIdAndRemove(postId);
    if (!deletedPost) {
      return res.status(404).json({ message: 'Post not found.' });
    }
    res.json({ message: 'Post deleted successfully.' });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ message: 'Failed to delete post.' });
  }
};

module.exports = {
 adminRegister,
  adminLogin,
  deleteIntern,
  deleteOrganization,
  deleteInternshipPost,
};
