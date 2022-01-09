const mongoose = require('mongoose');

const processSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: false
    },
    tutorialUrl: {
        type: String,
        required: false
    }
});

const processModel = mongoose.model('Process', processSchema);

module.exports = {
    processSchema,
    processModel
};