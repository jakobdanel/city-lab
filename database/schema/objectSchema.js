const mongoose = require('mongoose');

const objectSchema = new mongoose.Schema({
    objectName: {
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
    }
});

const objectModel = mongoose.model('Object', objectSchema);

module.exports = {
    objectSchema,
    objectModel
};