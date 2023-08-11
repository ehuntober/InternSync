require('dotenv').config();

const jwt = require('jsonwebtoken');
const Organization = require('../models/organization');

const organizationAuthMiddleware = async (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    if (decodedToken.userType === 'organization') {
      const organization = await Organization.findById(decodedToken.user._id);
      if (!organization) {
        return res.status(401).json({ message: 'Access denied. Invalid token.' });
      }
      req.user = organization; // Set the authenticated organization object to the request for further use
      next();
    } else {
      return res.status(401).json({ message: 'Access denied. Invalid token.' });
    }
  } catch (error) {
    console.error('Error verifying organization token:', error);
    res.status(500).json({ message: 'Failed to authenticate as organization.' });
  }
};

module.exports = organizationAuthMiddleware;
