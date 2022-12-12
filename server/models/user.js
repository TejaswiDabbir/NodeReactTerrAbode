const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    isHost : {
        type : Boolean
    },
    contactDetails : {
        phone : {
            type : String
        },
        email : {
            type : String
        }
    },
    firstName : {
        type : String
    },
    middleName : {
        type : String
    },
    lastName : {
        type : String
    },
    gender : {
        type : String
    },
    address : {
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
    },
    hostDetails : {
        rating : {
            type : Number
        },
        properties : [
            {
                type : String
            }
        ]
    },
    userName: {
        type : String
    },
    password : {
        type : String
    }
})

module.exports = mongoose.model('users', userSchema)