
const Internship = require('../models/internship');

exports.getAll = (req, res) => {
    Internship.find()
      .then(internships => {
        res.json(internships);
      })
      .catch(err => {
        res.status(500).json({ error: 'An error occurred' });
      });
  };


exports.create = (req,res) =>{
    const internshipData = req.body;
    Internship.create(internshipData)

    .then(internship =>{
        res.status(201).json(internship);
    })

    .catch(err =>{
        res.status(500).json({error: 'An error occured'})
        console.log(err)
    })

};


exports.getById = (req,res) => {
    const internshipId = req.params.id;
    Internship.findById(internshipId)
    .then(internship =>{
        if (!internshp){
            return res.status(404).json({err: 'Internship not found'});

        }
        res.json(internship);
    })
    .catch(err =>{
        res.status(500).json({error: 'An error occurred'})
    });
}


// Update an existing internship
exports.update = (req, res) => {
    const internshipId = req.params.id;
    const updatedData = req.body;
    Internship.findByIdAndUpdate(internshipId, updatedData, { new: true })
      .then(internship => {
        if (!internship) {
          return res.status(404).json({ error: 'Internship not found' });
        }
        res.json(internship);
      })
      .catch(err => {
        res.status(500).json({ error: 'An error occurred' });
      });
  };
  
  // Delete an internship
  exports.delete = (req, res) => {
    const internshipId = req.params.id;
    Internship.findByIdAndDelete(internshipId)
      .then(internship => {
        if (!internship) {
          return res.status(404).json({ error: 'Internship not found' });
        }
        res.sendStatus(204);
      })
      .catch(err => {
        res.status(500).json({ error: 'An error occurred' });
      });
  };