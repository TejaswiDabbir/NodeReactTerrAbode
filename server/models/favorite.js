const mongoose = require('mongoose')

const favoriteSchema = new mongoose.Schema({
    propertyId : {
        type : mongoose.Schema.Types.ObjectId
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId
    }
})

module.exports = mongoose.model('favorites', favoriteSchema)