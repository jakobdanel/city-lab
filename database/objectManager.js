/**
 * The Object Model from `./schema/objectSchema.js` 
 */
 const Object = require('./schema/objectSchema').objectModel;

 /**
  * The Object Schema from `./schema/objectSchema.js` 
  */
 const ObjectSchema = require('./schema/objectSchema').objectSchema;
 
 /**
  * The mongoose package from npm.
  */
 const mongoose = require('mongoose');
 
 
 
 /**
  * Getting all entries inside the database which are in the collection Objects. If there is no entry it returns an empty array. 
  * Also return some metadata. 
  * @returns An object with metadata and the actual data stored in the data field.
  */
 async function getAllObjects() {
     try {
         let result = await Object.find();
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
  * Getting the entry inside the databases collection Objects with the given Object id. 
  * If there is no entry with this id the function will return null. 
  * @param {mongoose.Schema.Type.ObjectID} id The id of the searched object.
  * @returns The Object with the given id, if exists.
  */
 async function getOneObject(id) {
     try {
         let result = await Object.findById(id);
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
  * This function creates a new Object. It will validate the input parameters. 
  * @param {{objectName:String,description:String,imageUrl:String}} objectData The data which be wanted to store in the DB.
  */
 async function createObject(objectData) {
 
     let object = {
         objectName: objectData.objectName,
         description: objectData.description,
         imageUrl: objectData.imageUrl
     }
     try {
         await Object.create(object);
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
         data: plant,
         message: "Successfull added"
     }
 }
 
 /**
  * This function delete the object with the given id. If the object is not found the function will return null.
  * @param {mongoose.SchemaType.ObjectID} id The id of the object which should be deleted. 
  * @returns An object with the status of the delete operation, in the ok field as boolean and a message in the message field. If the request
  * was successful, the data field will hold the return value from mongoose. Else the data field will be null and the error field will hold the error
  * object.
  */
 async function deleteOneObject(id) {
     try {
         let result = await Object.remove({
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
  * This function takes in the modified object and updates the object with the given id.
  * All data from the object needs to be send with the request. The function will check if the object exists. If the object does not exist the function will return null.
  * If an error occured the data field will be null and the error field will hold the error object.
  * @param {{objectName:String,description:String,imageUrl:String}} objectData The data from req.body which should be updated. Must contain the id of the object.
  * @returns The updated object in the result field. If the object does not exist the result field will be null. If an error occured the 
  * result field will be null and the error field will hold the error object. Also containing a status field as boolean and a message field.
  */
 async function modifyObject(objectData) {
    let object = {
        objectName: objectData.objectName,
        description: objectData.description,
        imageUrl: objectData.imageUrl
    }
    try {
        let result = await Object.findByIdAndUpdate(objectData._id, object);
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
     getAllObjects,
     getOneObject,
     createObject,
     deleteOneObject,
     modifyObject
 };