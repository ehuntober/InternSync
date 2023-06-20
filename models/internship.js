
//internship models

const mongoose = require('mongoose');

const internshipSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    duration:{
        type: Number,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    // organization: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Organization',
    //     required: true
    // }

    organization:{
        type: String,
        required: true
    }
})


const Internship = mongoose.model('Internship', internshipSchema);

module.exports = Internship;