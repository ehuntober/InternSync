const mongoose = require('mongoose');

const internshipPostSchema = new mongoose.Schema({
  organization: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  deadline: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
});

const InternshipPost = mongoose.model('InternshipPost', internshipPostSchema);

module.exports = InternshipPost;
