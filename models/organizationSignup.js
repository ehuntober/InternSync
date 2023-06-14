
const mongoose = require('mongoose');

const organizationSignupSchema = new mongoose.Schema({
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

const OrganizationSignup = mongoose.model('OrganizationSignup', organizationSignupSchema);

module.exports = OrganizationSignup;
