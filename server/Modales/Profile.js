const mongoose = require('mongoose');

const NewProfile = new mongoose.Schema({
    Profile_Name: {
        type: String,
        required: true
    },
    Profile_img: {
        type: String,
    },
    Email: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    Mobile_No: {
        type: Number,
        required: true
    },
    Gender: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('profile',NewProfile)