const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Intern = require('../models/intern');
const Organization = require('../models/organization');

const internRegister = async (req, res) => {
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
      console.error('Error registering intern:', error);
      res.status(500).json({ message: 'Failed to register intern.' });
    }
  };

const organizationRegister = async (req, res) => {
    const { name, email, password, description, website } = req.body;
    try {
      const existingOrganization = await Organization.findOne({ email });
      if (existingOrganization) {
        return res.status(400).json({ message: 'Email already registered as an organization.' });
      }
  
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      const newOrganization = new Organization({
        name,
        email,
        password: hashedPassword,
        description,
        website,
      });
  
      await newOrganization.save();
  
      res.status(201).json({ message: 'Organization account created successfully.' });
    } catch (error) {
      console.error('Error registering organization:', error);
      res.status(500).json({ message: 'Failed to register organization.' });
    }
  };

const internLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const intern = await Intern.findOne({ email });
    if (!intern) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    const isPasswordValid = await bcrypt.compare(password, intern.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    const token = jwt.sign({ user: intern },  process.env.JWT_SECRET,, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error('Error logging in as intern:', error);
    res.status(500).json({ message: 'Login failed.' });
  }
};

const organizationLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const organization = await Organization.findOne({ email });
    if (!organization) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    const isPasswordValid = await bcrypt.compare(password, organization.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    const token = jwt.sign({ user: organization }, 'your_secret_key', { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error('Error logging in as organization:', error);
    res.status(500).json({ message: 'Login failed.' });
  }
};

module.exports = {
  internRegister,
  organizationRegister,
  internLogin,
  organizationLogin,
};
