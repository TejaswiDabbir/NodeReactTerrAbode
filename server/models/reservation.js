const mongoose = require('mongoose')

const reservationSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId
        // type : String
    },
    propertyId : {
        type : mongoose.Schema.Types.ObjectId
        // type : String
    },
    propertyName : {
        type : String
    },
    hostId : {
        type : mongoose.Schema.Types.ObjectId
    },
    bookingPrice : {
        type : Number
    },
    status : {
        type : String
    },
    startDate : {
        type : Date,
        default : Date.now
    },
    endDate : {
        type : Date
    },
})

module.exports = mongoose.model('reservations', reservationSchema)