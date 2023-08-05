const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  intern: { type: mongoose.Schema.Types.ObjectId, ref: 'Intern', required: true },
  internshipPost: { type: mongoose.Schema.Types.ObjectId, ref: 'InternshipPost', required: true },
  appliedAt: { type: Date, default: Date.now },
});

const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;
