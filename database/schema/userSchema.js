const mongoose = require('mongoose');

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
        minLength: 8,
        required: true
    },
    email: {
        type: String,
        required: true
    }
})
const userModel = mongoose.model("User", userSchema);

module.exports = {
    userSchema,
    userModel
};