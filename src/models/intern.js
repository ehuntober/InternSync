const mongoose = require('mongoose');

const internSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  portfolioLink: { type: String },
  profileLink: { type: String },
  skills: { type: [String], default: [] },
  education: {
    school: { type: String },
    degree: { type: String },
    fieldOfStudy: { type: String },
    graduationYear: { type: Number },
  },
  experiences: [
    {
      title: { type: String },
      company: { type: String },
      location: { type: String },
      startDate: { type: Date },
      endDate: { type: Date },
      description: { type: String },
    },
  ],
});

const Intern = mongoose.model('Intern', internSchema);

module.exports = Intern;
