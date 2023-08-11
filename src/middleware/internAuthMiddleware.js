require('dotenv').config();

const jwt = require('jsonwebtoken');
const Intern = require('../models/intern');

const internAuthMiddleware = async (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    if (decodedToken.userType === 'intern') {
      const intern = await Intern.findById(decodedToken.user._id);
      if (!intern) {
        return res.status(401).json({ message: 'Access denied. Invalid token.' });
      }
      req.user = intern; // Set the authenticated intern object to the request for further use
      next();
    } else {
      return res.status(401).json({ message: 'Access denied. Invalid token.' });
    }
  } catch (error) {
    console.error('Error verifying intern token:', error);
    res.status(500).json({ message: 'Failed to authenticate as intern.' });
  }
};

module.exports = internAuthMiddleware;
