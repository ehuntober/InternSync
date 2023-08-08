require('dotenv').config();

const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');
const Intern = require('../models/intern');
const Organization = require('../models/organization');

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    if (decodedToken.userType === 'admin') {
      const admin = await Admin.findById(decodedToken.user._id);
      if (!admin) {
        return res.status(401).json({ message: 'Access denied. Invalid token.' });
      }
      req.user = admin; // Set the authenticated user (admin) object to the request for further use
      next();
    } else if (decodedToken.userType === 'intern') {
      const intern = await Intern.findById(decodedToken.user._id);
      if (!intern) {
        return res.status(401).json({ message: 'Access denied. Invalid token.' });
      }
      req.user = intern; // Set the authenticated user (intern) object to the request for further use
      next();
    } else if (decodedToken.userType === 'organization') {
      const organization = await Organization.findById(decodedToken.user._id);
      if (!organization) {
        return res.status(401).json({ message: 'Access denied. Invalid token.' });
      }
      req.user = organization; // Set the authenticated user (organization) object to the request for further use
      next();
    } else {
      return res.status(401).json({ message: 'Access denied. Invalid token.' });
    }
  } catch (error) {
    console.error('Error verifying token:', error);
    res.status(500).json({ message: 'Failed to authenticate.' });
  }
};

module.exports = authMiddleware;
