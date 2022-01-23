const mongoose = require('mongoose');

const userSchema = require('./userSchema.js').userSchema;
const User = require('./userSchema').userModel;
const Plant = require('./plantSchema');

let idValidator = require('mongoose-id-validator');

const taskSchema = new mongoose.Schema({
    taskName: {
        
        type: String,
        required: true
    },
    taskType: {
        type: "String",
        enum: ["Plant", "Object", "Process"],
        required: true
    },
    plant: {
        // type: mongoose.SchemaTypes.ObjectId,
        // ref: "Plant"
        type: String
    },
    object: {
        // type: mongoose.SchemaTypes.ObjectId,
        // ref: "Object"
        type: String
    },
    process: {
        // type: mongoose.SchemaTypes.ObjectId,
        // ref: "Process"
        type: String
    },
    creator: {
        // type: mongoose.SchemaTypes.ObjectId,
        // ref: 'User',
        required: true,
        type: String
    },
    details: {
        type: [String],
        minLength: 1,
        required: true
    },
    until: {
        type: Date,
        required: true,
        default: () => Date.now(),
        validator: (date) => Date.now() <= date
    },
    //modifier: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User'
    // },
    assignedTo: {
        // type: mongoose.SchemaTypes.ObjectId,
        // ref: 'User',
        required: true,
        type: String
    }
})
taskSchema.plugin(idValidator);
/**
 * Schema for a DataBase Task Object. Holding a taskName as String, a user as reference to User Object ID(actually as dummy ID). details as String,
 * until as an Date Object(atm as String) and a modifier also as reference to an User Object(atm as dummy ID).
 */
const taskModel = mongoose.model("Task", taskSchema);

module.exports = {
    taskSchema,
    taskModel
};