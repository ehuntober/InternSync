require('dotenv').config();

const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');

const adminAuthMiddleware = async (req, res, next) => {
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
      req.user = admin; // Set the authenticated admin object to the request for further use
      next();
    } else {
      return res.status(401).json({ message: 'Access denied. Invalid token.' });
    }
  } catch (error) {
    console.error('Error verifying admin token:', error);
    res.status(500).json({ message: 'Failed to authenticate as admin.' });
  }
};

module.exports = adminAuthMiddleware;
