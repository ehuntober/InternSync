const Intern = require('../models/intern');

const updateInternProfile = async (req, res) => {
  const internId = req.params.id;
  const { name, portfolioLink, profileLink, skills, education, experiences } = req.body;

  try {
    const updatedIntern = await Intern.findByIdAndUpdate(
      internId,
      {
        name,
        portfolioLink,
        profileLink,
        skills,
        education,
        experiences,
      },
      { new: true }
    );

    if (!updatedIntern) {
      return res.status(404).json({ message: 'Intern not found.' });
    }

    res.json(updatedIntern);
  } catch (error) {
    console.error('Error updating intern profile:', error);
    res.status(500).json({ message: 'Failed to update intern profile.' });
  }
};

module.exports = {
  updateInternProfile,
};
