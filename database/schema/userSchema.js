const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
    gardenID: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Garden",
        required: true,
    },
    role: {
        type: String,
        required: true,
        enum: ['Admin','Member']
    }
})
const timeIntervalschema = new mongoose.Schema({
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    }
})

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    telefonNumber: {
        type: String,
        maxlength: 15
    },
    garden: {
        type: [memberSchema],
        required:true,
    },
    tasks: {
        type: [mongoose.SchemaTypes.ObjectId],
        required: true,
        ref: "Task"
    },
    presenceTime: [timeIntervalschema]
})
const userModel = mongoose.model("User", userSchema);

module.exports = {
    userSchema,
    userModel
};