/**
 * The User Model from `./schema/userSchema.js` 
 */
const User = require('./schema/userSchema').userModel;

/**
 * The User Schema from `./schema/userSchema.js` 
 */
const UserSchema = require('./schema/userSchema').userSchema;

/**
 * The Task Model from `./schema/taskSchema.js`
 */
const Task = require('./schema/taskSchema.js').taskModel;

/**
 * The mongoose package from npm.
 */
const mongoose = require('mongoose');



/**
 * Getting all entries inside  the database which are in the collection Tasks. If there is no entry it returns an empty array. Also return
 * some metadata 
 * @returns An object with metadata and the actual data stored in the data field.
 */
async function getAllTask() {
    try {
        let result = await Task.find();
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
 * Getting the entry inside the databases collection Task with the given Object id. If there iss no entry with this id the function will 
 * return null 
 * @param {mongoose.Schema.Type.ObjectID} id The id of the searched object.
 * @returns The Task object with the given id, if exists.
 */
async function getOneTask(id) {
    try {
        let result = await Task.findById(id);
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
 * This function create a new Task. It will validate if the input parameters are valid. The user and modifier id must exist in the users
 * collection. The taskName must be a String and can not be zero. The details musst exist, but can be empty. The until parameter is a String which
 * can not be empty.
 * 
 * The function checking for input if the input isValid. Therefore its make a connection to mongoose and collecting all user Ids saved in the
 * users collection. Then it verify that the given user and modifier exist. If all criteria are validated the object will be stored in the task database.
 * 
 * TODO: Actual validation for until parameter, three ways: String in a specific format, unix timeStamp or DateTime object.
 * @param {{taskName:String,user: ObjectID,details:String,until:String,modifier:ObjectID}} taskData The data which be wanted to store in the DB.
 */
async function createTask(taskData) {

    let task = {
        taskName: taskData.taskName,
        taskType: taskData.taskType,
        creator: taskData.creator,
        details: taskData.details,
        until: taskData.until,
        modifier: taskData.modifier,
        assignedTo: taskData.assignedTo
    }
    let taskType = task.taskType;
    if (taskType == "Plant") {
        task.plant = taskData.plant;
    }
    if (taskType == "Object") {
        task.object = taskData.object;
    }
    if (taskType == "Plant") {
        task.plant = taskData.plant;
    }
    try {
        await Task.create(task);
    } catch (error) {
        return {
            ok: false,
            data: null,
            messsage: "Validation error occured",
            error
        }
    }

    return {
        ok: true,
        data: task,
        message: "Successfull added"
    }
}



/**
 * This function delete the task with the given id. If the task is not found the function will return null.
 * @param {mongoose.SchemaType.ObjectID} id The id of the task which should be deleted. 
 * @returns An object with the status of the delete operation, in the ok field as boolean and a message in the message field. If the request
 * was successful the data field will hold the return value from mongoose. Else the data field will be null and the error field will hold the error
 * object.
 */
async function deleteOneTask(id) {
    try {
        let result = await Task.remove({
            _id: id
        });
        return {
            ok:true,
            message: "Successfully removed Task",
            data: result
        } 
    } catch (error) {
        return {
            ok:false,
            message: "An error occured",
            error
        } 
    }
}
/**
 * Extending the task object with the objects from the User with the Id given in the parameter. Both user and modifier will be extended. 
 * @param {{taskName:String,user: ObjectID,details:String,until:String,modifier:ObjectID}} task 
 * @returns The extended object with the user information.
 */
async function getUserToTask(task) {
    let user = await User.findById(task.user);
    let modifier = await User.findById(task.modifier);
    return {
        _id: task._id,
        user: user,
        details: task.details,
        until: task.until,
        modifier: modifier
    }
}

/**
 * Extending the task objects with the objects from the User with the Id given in the parameter. Both user and modifier will be extended. 
 * @param {{{taskName:String,user: ObjectID,details:String,until:String,modifier:ObjectID}[]}} task 
 * @returns The extended object with the user information as an array
 */
async function getUserToTasks(tasks) {
    let extendedTasks = [];
    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        let extendedTask = await getUserToTask(task);
        extendedTasks.push(extendedTask);
    }
    return extendedTasks;
}

/**
 * This function takes in the modified task object and updates the task with the given id. The task object must contain the id of the task.
 * All data from the task object needs to be send with the request. The function will check if the task exists. If the task exists the function
 * will update the task with the given id. If the task does not exist the function will return null. Also the function return an status as boolean
 * and a message in the message field. If an error occured the data field will be null and the error field will hold the error object.
 * @param {any} taskData The data from req.body which should be updated. Need to contain the id of the task. Also must contain taskName,
 * creator, details, until,assignedTo and modifier. Must contain one of Plant, Object or Process as in taskType specified. 
 * @returns The updated task object in the result field. If the task does not exist the result field will be null. If an error occured the 
 * result field will be null and the error field will hold the error object. Also containing a status field as boolean and a message field.
 */
async function modifyTask(taskData) {
    let task = {
        taskName: taskData.taskName,
        taskType: taskData.taskType,
        creator: taskData.creator,
        details: taskData.details,
        until: taskData.until,
        modifier: taskData.modifier,
        assignedTo: taskData.assignedTo
    }
    let taskType = task.taskType;
    if (taskType == "Plant") {
        task.plant = taskData.plant;
    }
    if (taskType == "Object") {
        task.object = taskData.object;
    }
    if (taskType == "Plant") {
        task.plant = taskData.plant;
    }
    try {
        let result = await Task.findByIdAndUpdate(taskData._id, task);
        return {
            ok: true,
            data: result,
            message: "Successfull updated" 
        }
    } catch (error) {
        return {
            ok: false,
            data: null,
            message: "Validation error occured",
            error
        }
    }
} 


module.exports = {
    getAllTask,
    getOneTask,
    createTask,
    deleteOneTask,
    getUserToTask,
    getUserToTasks,
    modifyTask
};