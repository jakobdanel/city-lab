const mongoose = require('mongoose');

let plantSchema = new mongoose.Schema({
    name:String
})

let plantModel = mongoose.model("Plant",plantSchema);

module.exports = {
    plantSchema,
    plantModel
}