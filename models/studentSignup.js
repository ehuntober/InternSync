// models/studentSignup.js
const mongoose = require('mongoose');

const studentSignupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  
});

const StudentSignup = mongoose.model('StudentSignup', studentSignupSchema);

module.exports = StudentSignup;