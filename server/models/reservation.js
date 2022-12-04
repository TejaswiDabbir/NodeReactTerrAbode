const mongoose = require('mongoose')

const reservationSchema = new mongoose.Schema({
    "userId" : {
        // type : mongoose.Schema.Types.ObjectId
        type : String
    },
    "propertyId" : {
        // type : mongoose.Schema.Types.ObjectId
        type : String
    },
    "bookingPrice" : {
        "value" : {
            type : Number
        },
        "currency" : {
            type : String
        }
    },
    "status" : {
        type : String
    },
    "startDate" : {
        type : Date,
        default : Date.now
    },
    "endDate" : {
        type : Date
    },
    "transaction" : {
        // type : mongoose.Schema.Types.ObjectId
        type : String
    },
})

module.exports = mongoose.model('reservations', reservationSchema)