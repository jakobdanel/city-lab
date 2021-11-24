const User = require('./schema/userSchema.js');
const Task = require('./schema/taskSchema.js');

const {
    mongooseInteraction
} = require('./mongooseConnection');
const {
    ObjectID
} = require('bson');

const jakob = new User({
    username: 'jdanel',
    firstName: 'Jakob',
    lastName: 'Danel',
    password: '1234',
    email: 'jakob@test.de'
})
/**
 * An dummy Task Object as testing dummy.
 */
const waterPlant = new Task({
    taskName: "Water Flowers",
    details: "Watering all plants, that need water at the moment",
    until: "Tomorrow",
});

/**
 * Getting all entries inside  the database which are in the collection Tasks. If there is no entry it returns null. 
 * @returns An array containing all entries in the Task database.
 */
async function getAllTask() {
    return await mongooseInteraction(async (args) => {
        return await Task.find();
    }, {});
}

/**
 * Getting the entry inside the databases collection Task with the given Object id. If there iss no entry with this id the function will 
 * return null 
 * @param {mongoose.Schema.Type.ObjectID} id The id of the searched object.
 * @returns The Task object with the given id, if exists.
 */
async function getOneTask(id) {
    return await mongooseInteraction(async (id) => {
        return await Task.findById(id);
    }, id);
}

/**
 * These function create a new Task. It will validate if the input parameters are valid. The user and modifier id must exist in the users
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
    mongooseInteraction(async (args) => {
        //Check if User exists
        let users = await User.find();
        let userExist = {
            user: false,
            modifier: false
        }
        for (let i = 0; i < users.length; i++) {
            const element = users[i];
            if (element._id == taskData.user) {
                userExist.user = true;
            }
            if (element._id == taskData.modifier) {
                userExist.modifier = true;
            }
        }
        if (!userExist.user) {
            throw new Error("User doess not exist");
        }
        if (!userExist.modifier) {
            throw new Error("Modifier does not exist");
        }
        if (userExist.user && userExist.modifier) {
            if (taskData.taskName == "") {
                throw new Error("taskName cannot be zero");
            }
            if (taskData.details == undefined) {
                throw new Error("details must exist");
            }
            if (taskData.until == '') {
                throw new Error('until cannot be zero')
            } else {
                await Task.create({
                    taskName: taskData.taskName,
                    user: taskData.user,
                    details: taskData.details,
                    until: taskData.until,
                    modifier: taskData.modifier
                });
            }

        }
    }, taskData);
}

async function deleteOneTask(id) {
    return await mongooseInteraction(async (id) => {
        return await Task.remove({
            _id: id
        });
    }, id)
}
/**
 * Extending the task object with the objects from the User with the Id given in the parameter. Both user and modifier will be extended. 
 * @param {{taskName:String,user: ObjectID,details:String,until:String,modifier:ObjectID}} task 
 * @returns The extended object with the user information.
 */
async function getUserToTask(task) {
    return await mongooseInteraction(async (task) => {
        let user = await User.findById(task.user);
        let modifier = await User.findById(task.modifier);
        return {
            _id: task._id,
            user: user,
            details: task.details,
            until: task.until,
            modifier: modifier
        };
    }, task)
}

/**
 * Extending the task objectss with the objects from the User with the Id given in the parameter. Both user and modifier will be extended. 
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
module.exports = {
    getAllTask,
    getOneTask,
    createTask,
    deleteOneTask,
    getUserToTask,
    getUserToTasks
};