const mongoose = require('mongoose');
const {
    userSchema
} = require('./userSchema');
const {
    pointSchema
} = require('./pointSchema');

const gardenSchema = new mongoose.Schema({
    gardenName: {
        type: String,
        required: true
    },
    location: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Point',
        required: true
    },
    members: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: "User"
    },
    admins: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: "User"
    },
    plants: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: "Plant"
    }
});

const gardenModel = mongoose.model("Garden", gardenSchema);

module.exports = {
    gardenSchema,
    gardenModel
};