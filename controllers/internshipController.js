
const Intership = require('../models/internship');

exports.getAll = (req,res) =>{
    Intership.find()
    .then(Interships =>{
        res.json(Intership)
    })

    .catch(err=>{
        res.status(500).json({error: 'An error occurred'})
    });
};


exports.create = (req,res) =>{
    const internshipData = req.body;
    Intership.create(internshipData)

    .then(internship =>{
        res.status(201).json(internship);
    })

    .catch(err =>{
        res.status(500).json({error: 'An error occured'})
        console.log(err)
    })

};