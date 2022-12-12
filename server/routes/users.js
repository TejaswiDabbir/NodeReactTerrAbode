const express = require('express')
const router = express.Router()
const User = require('../models/user')

//list all
// router.get('/', async (req,res) => {
//     try{
//         const properties = await Property.find()
//         res.send(properties)
//     } catch(error) {
//         res.status(500).json({ message:error.message })
//     }
// })

//get one helper
async function getUser(req,res,next) {
    let user
    try {
        user = await User.findById(req.params.id)
        if (user == null) {
            return res.status(404).json({ message: 'Id not present in users'})
        }
    } catch(error) {
        return res.status(500).json({ message:error.message })
    }
    res.user = user
    next()
}

//list one
router.get('/:id', getUser, (req,res) => {
    res.json(res.user)
})

router.get('/:userName', async (req,res) => {
    try{
        const users = await User.find({
            userName : req.params.userName
        })
        res.send(users)
    } catch(error) {
        res.status(500).json({ message:error.message })
    }
})
//add one
// router.post('/', async (req,res) => {
//     try{
//         console.log(req.body)
//         const user = new User({
//             isHost : req.body.isHost,
//             contactDetails : {
//                 phone : req.body.contactDetails.phone,
//                 email : req.body.contactDetails.email
//             },
//             firstName : req.body.firstName,
//             middleName : req.body.middleName,
//             lastName : req.body.lastName,
//             gender : req.body.gender,
//             address : {
//                 streetName : req.body.address.streetName,
//                 apt : req.body.address.apt,
//                 city : req.body.address.city,
//                 state : req.body.address.state,
//                 country : req.body.address.country,
//                 pinCode : req.body.address.pinCode,
//             },
//             hostDetails : {
//                 rating : req.body.hostDetails.rating,
//                 properties : []
//             }
//         })
//         const newUser = await user.save()
//         res.status(200).json(newUser)
//     } catch(error) {
//         res.status(400).json({ message:error.message })
//     }
// })

router.post('/', async (req,res) => {
    try{
        const newUsers = new User({
		//contactDetails =req.body.contactDetails != null ?req.body.contactDetails : {};
        firstName : req.body.firstName != null ? req.body.firstName : firstName,
        middleName : req.body.middleName != null ? req.body.middleName : middleName,
        lastName : req.body.lastName != null ? req.body.lastName : lastName,
        gender : req.body.gender != null ? req.body.gender : "default",
        //res.user.address = req.body.address != null ? req.body.address : {};
        //res.user.hostDetails = req.body.hostDetails != null ? req.body.hostDetails : {};
        //isHost : req.body.isHost != null ? req.body.isHost : "default",
        userName : req.body.userName != null ? req.body.userName : userName,
        password : req.body.hashedPassword != null ? req.body.hashedPassword : password
        })
        const newUser = await newUsers.save()
        res.json(newUser)
    } catch(error) {
        res.status(400).json({ message:error.message })
    }
})

//update one
router.patch('/:id', getUser, async (req,res) => {
    try {
        res.user.contactDetails = req.body.contactDetails != null ? req.body.contactDetails : res.user.contactDetails;
        res.user.firstName = req.body.firstName != null ? req.body.firstName : res.user.firstName;
        res.user.middleName = req.body.middleName != null ? req.body.middleName : res.user.middleName;
        res.user.lastName = req.body.lastName != null ? req.body.lastName : res.user.lastName;
        res.user.gender = req.body.gender != null ? req.body.gender : res.user.gender;
        res.user.address = req.body.address != null ? req.body.address : res.user.address;
        res.user.hostDetails = req.body.hostDetails != null ? req.body.hostDetails : res.user.hostDetails;
        res.user.isHost = req.body.isHost != null ? req.body.isHost : res.user.isHost;
        const updatedUser = await res.user.save()
        res.json(updatedUser)
    } catch (error) {
        res.status(400).json({ message:error.message })
    }
})

//delete one
// router.delete('/:id', getProperty, async (req,res) => {
//     try {
//         await res.property.remove()
//         res.json({ message: "Property deleted"})
//     } catch(error) {
//         res.status(500).json({ message:error.message })
//     }
// })


module.exports = router