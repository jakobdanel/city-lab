/**
 * The Plant Model from `./schema/plantSchema.js` 
 */
 const Plant = require('./schema/plantSchema').plantModel;

 /**
  * The Plant Schema from `./schema/plantSchema.js` 
  */
 const PlantSchema = require('./schema/plantSchema').plantSchema;
 
 /**
  * The mongoose package from npm.
  */
 const mongoose = require('mongoose');
 
 
 
 /**
  * Getting all entries inside the database which are in the collection Plants. If there is no entry it returns an empty array. 
  * Also return some metadata. 
  * @returns An object with metadata and the actual data stored in the data field.
  */
 async function getAllPlants() {
     try {
         let result = await Plant.find();
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
  * Getting the entry inside the databases collection Plants with the given Object id. If there is no entry with this id the function will 
  * return null 
  * @param {mongoose.Schema.Type.ObjectID} id The id of the searched object.
  * @returns The Plant object with the given id, if exists.
  */
 async function getOnePlant(id) {
     try {
         let result = await Plant.findById(id);
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
  * This function create a new Plant. It will validate the input parameters. The plantName must be a String and can not be zero. The details must exist, but can be empty. 
  * @param {{plantName:String,plantSpecies:String,details:String,imgUrl:String,dataUrl:String}} plantData The data which be wanted to store in the DB.
  */
 async function createPlant(plantData) {
 
     let plant = {
         plantName: plantData.plantName,
         plantSpecies: plantData.plantSpecies,
         details: plantData.details,
         imgUrl: plantData.imgUrl,
         dataUrl: plantData.dataUrl
     }
     try {
         await Plant.create(plant);
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
  * This function delete the plant with the given id. If the plant is not found the function will return null.
  * @param {mongoose.SchemaType.ObjectID} id The id of the plant which should be deleted. 
  * @returns An object with the status of the delete operation, in the ok field as boolean and a message in the message field. If the request
  * was successful, the data field will hold the return value from mongoose. Else the data field will be null and the error field will hold the error
  * object.
  */
 async function deleteOnePlant(id) {
     try {
         let result = await Plant.remove({
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
  * This function takes in the modified plant object and updates the plant with the given id.
  * All data from the plant object needs to be send with the request. The function will check if the plant exists. If the plant does not exist the function will return null.
  * If an error occured the data field will be null and the error field will hold the error object.
  * @param {{plantName:String,plantSpecies:String,details:String,imgUrl:String,dataUrl:String}} plantData The data from req.body which should be updated. Must contain the id of the plant.
  * @returns The updated plant object in the result field. If the plant does not exist the result field will be null. If an error occured the 
  * result field will be null and the error field will hold the error object. Also containing a status field as boolean and a message field.
  */
 async function modifyPlant(plantData) {
    let plant = {
        plantName: plantData.plantName,
        plantSpecies: plantData.plantSpecies,
        details: plantData.details,
        imgUrl: plantData.imgUrl,
        dataUrl: plantData.dataUrl
    }
    try {
        let result = await Plant.findByIdAndUpdate(plantData._id, plant);
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
     getAllPlants,
     getOnePlant,
     createPlant,
     deleteOnePlant,
     modifyPlant
 };