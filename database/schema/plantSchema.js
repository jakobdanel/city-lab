const mongoose = require('mongoose');

let plantSchema = new mongoose.Schema({
    plantName:{
        type:String,
        required:true
    },
    plantSpecies:{
        type:String,
        required:true
    },
    details:{
        type: [String],
        minLength: 1,
        required: true
    },
    imgUrl:{
        type:String
    },
    dataUrl:{
        type:String
    }
})

let plantModel = mongoose.model("plant",plantSchema);

module.exports = {
    plantSchema,
    plantModel
}