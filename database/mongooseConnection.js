/**
 * URL as String to the local database.
 */
const url = 'mongodb://localhost:27017/easyGardenDB'

/**
 * mongoose module.
 */
const mongoose = require('mongoose');


/**
 * This function works as a wrapper for the processing function, it is checking that the connection to mongoose is hold, until the processing function
 * is done. After that it closes the connection to mongoose and returning the result of the processing function.
 * @param {Function} processingFunction This function will be called in the moment when a connection to MongoDb is build. Use async/await to let the
 * processingFunction wait until the work is done.
 * @param {any} args These arguments will be passed to processingFunction. They need to fit to the requirements of processingFunction
 * @returns If processingFunction has an return value, these value will be returned. If processsingFunction has no return, these function will
 * return null.
 */
async function mongooseInteraction(processingFunction, args) {
    await mongoose.connect(url);
    let result = await processingFunction(args);
    await mongoose.disconnect();
    return result;
}

module.exports = {
    mongooseInteraction
};