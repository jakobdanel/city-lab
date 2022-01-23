/**
 * The Model for the Processes.
 */
const Process = require('./schema/processSchema').processModel;

/**
 * The monogoose package from npm.
 */
const mongoose = require('mongoose');

/**
 * Getting all entries inside  the database which are in the collection Process. If there is no entry it returns an empty array. Also return
 * some metadata 
 * @returns An object with metadata and the actual data stored in the data field.
 */
async function getAllProcesses() {
    try {
        let result = await Process.find();
        return {
            ok: true,
            message: "Successfull loaded",
            data: result,
            dataLength: result.length
        }
    } catch (error) {
        return {
            ok: false,
            message: "Error occured",
            error
        }
    }
}

/**
 * Getting the entry inside the databases collection Process with the given Object id. If there is no entry with this id the function will 
 * return null 
 * @param {mongoose.Schema.Type.ObjectID} id The id of the searched object.
 * @returns The Process object with the given id, if exists.
 */
async function getOneProcess(id) {
    try {
        let result = await Process.findById(id);
        return {
            ok: true,
            data: result,
            message: "Successfull loaded"
        }
    } catch (error) {
        return {
            ok: false,
            data: null,
            message: "An error occured",
            error,
        }
    }
}

/**
 * This function create a new Process. The name and description are mandatory. It also has the String fields
 * imageURL and tutorialURL.
 * 
 * @param {{name: String, description: String, imageURL: String, tutorialURL: String}} processData The data of the new Process.
 * @returns An object with the status of the operation and the created Process.
 */
async function createProcess(processData) {
    try {
        let result = await Process.create(processData);
        return {
            ok: true,
            data: result,
            message: "Successfull created"
        }
    } catch (error) {
        return {
            ok: false,
            data: null,
            message: "An error occured",
            error,
        }
    }
}

async function modifyProcess(id, processData) {
    try {
        let result = await Process.findByIdAndUpdate(id, processData);
        return {
            ok: true,
            data: result,
            message: "Successfull modified"
        }
    } catch (error) {
        return {
            ok: false,
            data: null,
            message: "An error occured",
            error,
        }
    }
}

async function deleteOneProcess(id) {
    try {
        let result = await Process.remove({
            _id: id
        });
        return {
            ok: true,
            data: result,
            message: "Successfull removed"
        }
    } catch (error) {
        return {
            ok: false,
            data: null,
            message: "An error occured",
            error
        }
    }
}

module.exports = {
    getAllProcesses,
    getOneProcess,
    createProcess,
    modifyProcess,
    deleteOneProcess
}

