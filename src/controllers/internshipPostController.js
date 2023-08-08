const Organization = require('../models/organization');
const InternshipPost = require('../models/internshipPost');

const createInternshipPost = async (req, res) => {
  const organizationId = req.params.id;
  const { title, description, deadline } = req.body;

  try {
    const organization = await Organization.findById(organizationId);
    if (!organization) {
      return res.status(404).json({ message: 'Organization not found.' });
    }

    // Check if the authenticated user is an organization or an admin
    if (req.user._id.toString() !== organizationId && req.user.userType !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Only organizations and admins can create internship posts.' });
    }

    const newInternshipPost = new InternshipPost({
      organization: organizationId,
      title,
      description,
      deadline,
    });
    await newInternshipPost.save();

    res.status(201).json({ message: 'Internship post created successfully.', post: newInternshipPost });
  } catch (error) {
    console.error('Error creating internship post:', error);
    res.status(500).json({ message: 'Failed to create internship post.' });
  }
};

module.exports = {
  createInternshipPost,
};
