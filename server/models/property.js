const mongoose = require('mongoose')

const propertySchema = new mongoose.Schema({
    title : {
        type : String
    },
    description : {
        type : String
    },
    roomType : {
        type : String
    },
    bedrooms : {
        type : String
    },
    location : {
        streetName : {
            type : String
        },
        apt : {
            type : String
        },
        city : {
            type : String
        },
        state : {
            type : String
        },
        country : {
            type : String
        },
        pinCode : {
            type : String
        },
        latitude : {
            type : String
        },
        longitude : {
            type : String
        },
        description : {
            type : String
        },
    },
    hostId : {
        type : mongoose.Schema.Types.ObjectId
    },
    rating : {
        type : Number
    },
    thumbnails : [ {
        type : String
    } ],
    images : [ {
        _id : {
            type : String
        },
        filePath : {
            type : String
        },
        type : {
            type : String
        },
        description : {
            type : String
        },
    } ],
    rate : {
        ratePerNight : {
            type : Number
        },
        currency : {
            type : String
        },
        additionalCharges : [
            {
                chargeType : {
                    type : String
                },
                value : {
                    type : Number
                },
            }
        ]
    },
    reviews : [
        {
            userName : {
                type : String
            },
            rating : {
                type : String
            },
            date : {
                type : Date,
                default : Date.now
            },
            comment : {
                type : String
            },
        }
    ],
    amenities : [
        {
            type : {
                type : String
            },
            description : {
                type : String
            },
        }
    ],
    rules : [
        {
            type : {
                type : String
            },
            description : {
                type : String
            },
        }
    ]
})

module.exports = mongoose.model('properties', propertySchema)