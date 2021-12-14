const mongoose = require('mongoose');


const pointSchema = new mongoose.Schema({
    type: {
        type:String,
        enum: ['Point'],
        required:true
    },
    coordinates: {
        type: [Number],
        length: 2,
        required:true
    }

})

const pointModel = mongoose.model("Point",pointSchema);

module.exports = {
    pointSchema,
    pointModel
} 