const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decodedToken = jwt.verify(token, 'your_secret_key');
    const admin = await Admin.findById(decodedToken.user._id);

    if (!admin) {
      return res.status(401).json({ message: 'Access denied. Invalid token.' });
    }

    req.admin = admin; // Set the authenticated admin object to the request for further use
    next();
  } catch (error) {
    console.error('Error verifying token:', error);
    res.status(500).json({ message: 'Failed to authenticate.' });
  }
};

module.exports = authMiddleware;
