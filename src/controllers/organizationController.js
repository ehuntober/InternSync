

const Organization = require('../models/organization');

const getAllOrganizations = async (req, res) => {
  try {
    const organizations = await Organization.find();
    res.json({ organizations });
  } catch (error) {
    console.error('Error fetching organizations:', error);
    res.status(500).json({ message: 'Failed to fetch organizations.' });
  }
};

module.exports = {
  getAllOrganizations,
};
