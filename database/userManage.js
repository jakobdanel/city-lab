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
  * Getting all entries inside  the database which are in the collection Users. If there is no entry it returns an empty array. Also return
  * some metadata 
  * @returns An object with metadata and the actual data stored in the data field.
  */
 async function getAllUsers() {
     try {
         let result = await User.find();
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
  * Getting the entry inside the databases collection Users with the given Object id. If there is no entry with this id the function will 
  * return null 
  * @param {mongoose.Schema.Type.ObjectID} id The id of the searched object.
  * @returns The user object with the given id, if exists.
  */
 async function getOneUser(id) {
     try {
         let result = await User.findById(id);
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
  * Getting the entry inside the databases collection Users with the given Object id. If there is no entry with this id the function will 
  * return null 
  * @param {mongoose.Schema.Type.ObjectID} id The id of the searched object.
  * @returns The user object with the given id, if exists.
  */
 async function getUserToName(name) {
    try {
        let result = await User.findOne({'username':name}, 'username firstName lastName email telefonNumber');
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
  * This function create a new User. It will validate if the input parameters are valid. 
  * The attributes garden, tasks and presenceTime will be initialized but not filled.
  * @param {{username:String,firstname: String,lastname:String,password:String,email:String, telefonNumber:String}} UserData The data which be wanted to store in the DB.
  */
 async function createUser(userData) {
 
     let user = {
         username: userData.username,
         firstname: userData.firstname,
         lastname: userData.lastname,
         password: userData.password,
         email: userData.email,
         telefonNumber: userData.telefonNumber,
         garden:"",
         tasks: "",
         presenceTime: ""
     }
     try {
         await User.create(user);
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
         data: user,
         message: "Successfull added"
     }
 }
 
 
 
 /**
  * This function delete the user with the given id. If the user is not found the function will return null.
  * @param {mongoose.SchemaType.ObjectID} id The id of the user which should be deleted. 
  * @returns An object with the status of the delete operation, in the ok field as boolean and a message in the message field. If the request
  * was successful the data field will hold the return value from mongoose. Else the data field will be null and the error field will hold the error
  * object.
  */
 async function deleteOneUser(id) {
     try {
         let result = await User.remove({
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
  * This function takes in the modified user object and updates the user with the given id. The user object must contain the id of the user.
  * All data from the task object needs to be send with the request. The function will check if the user exists. If the task does not exist the function will return null. 
  * Also the function return an status as boolean and a message in the message field. If an error occured the data field will be null and the error field will hold the error object.
  * @param {any} userData The data from req.body which should be updated. Need to contain the id of the user. 
  * Also must contain username, firstname, lastname, password, email, telefonNumber, garden, tasks, presenceTime.
  * @returns The updated user object in the result field. If the task does not exist the result field will be null. If an error occured the 
  * result field will be null and the error field will hold the error object. Also containing a status field as boolean and a message field.
  */
 async function modifyUser(userData) {
     let user = {
        username: userData.username,
        firstname: userData.firstname,
        lastname: userData.lastname,
        password: userData.password,
        email: userData.email,
        telefonNumber: userData.telefonNumber,
        garden: userData.garden,
        tasks: userData.tasks,
        presenceTime: userData.presenceTime
     }
     try {
         let result = await User.findByIdAndUpdate(userData._id, user);
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
     getAllUsers,
     getOneUser,
     getUserToName,
     createUser,
     deleteOneUser,
     modifyUser
 };