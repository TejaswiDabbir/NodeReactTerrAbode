const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
    userName : {
        type : String
    },
    propertyId : {
        type : mongoose.Schema.Types.ObjectId
    },
    rating : {
        type : Number
    },
    comment : {
        type : String
    },
    timestamp : {
        type : Date,
        default : Date.now
    }
})

module.exports = mongoose.model('reviews', reviewSchema)