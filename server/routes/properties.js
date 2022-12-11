const express = require('express')
const property = require('../models/property')
const router = express.Router()
const Property = require('../models/property')

//list all
router.get('/', async (req,res) => {
    try{
        const properties = await Property.find()
        res.send(properties)
    } catch(error) {
        res.status(500).json({ message:error.message })
    }
})

//list per hostId
router.get('/host/:id', async (req,res) => {
    try{
        const properties = await Property.find({
            hostId: req.params.id
        })
        res.send(properties)
    } catch(error) {
        res.status(500).json({ message:error.message })
    }
})

//get one helper
async function getProperty(req,res,next) {
    let property
    try {
        property = await Property.findById(req.params.id)
        if (property == null) {
            return res.status(404).json({ message: 'Id not present in properties'})
        }
    } catch(error) {
        return res.status(500).json({ message:error.message })
    }
    res.property = property
    next()
}

//list one
router.get('/:id', getProperty, (req,res) => {
    res.json(res.property)
})

//add one
router.post('/', async (req,res) => {
    try{
        console.log(req.body)
        const property = new Property({
            title : req.body.title,
            description : req.body.description,
            roomType : req.body.roomType,
            bedrooms : req.body.bedrooms,
            location : {
                streetName : req.body.location.streetName,
                apt : req.body.location.apt,
                city : req.body.location.city,
                state : req.body.location.state,
                country : req.body.location.country,
                pinCode : req.body.location.pinCode,
                latitude : req.body.location.latitude,
                longitude : req.body.location.longitude,
                description : req.body.location.description,
            },
            hostId : req.body.hostId,
            rating : req.body.rating,
            thumbnails : req.body.thumbnails,
            images : req.body.images,
            rate : {
                ratePerNight : req.body.rate.ratePerNight,
                currency : req.body.rate.currency,
                additionalCharges : req.body.rate.additionalCharges
            },
            reviews : req.body.reviews,
            amenities : req.body.amenities,
            rules : req.body.rules
        })
        const newProperty = await property.save()
        res.status(200).json(newProperty)
    } catch(error) {
        res.status(400).json({ message:error.message })
    }
})

//update one
router.patch('/:id', getProperty, async (req,res) => {
    try {
        res.property.title = req.body.title != null ? req.body.title : res.property.title;
        res.property.description = req.body.description != null ? req.body.description : res.property.description;
        res.property.roomType = req.body.roomType != null ? req.body.roomType : res.property.roomType;
        res.property.bedrooms = req.body.bedrooms != null ? req.body.bedrooms : res.property.bedrooms;
        res.property.location = req.body.location != null ? req.body.location : res.property.location;
        res.property.hostId = req.body.hostId != null ? req.body.hostId : res.property.hostId;
        res.property.rating = req.body.rating != null ? req.body.rating : res.property.rating;
        res.property.thumbnails = req.body.thumbnails != null ? req.body.thumbnails : res.property.thumbnails;
        res.property.images = req.body.images != null ? req.body.images : res.property.images;
        res.property.rate = req.body.rate != null ? req.body.rate : res.property.rate;
        res.property.reviews = req.body.reviews != null ? req.body.reviews : res.property.reviews;
        res.property.amenities = req.body.amenities != null ? req.body.amenities : res.property.amenities;
        res.property.rules = req.body.rules != null ? req.body.rules : res.property.rules;
        const updatedProperty = await res.property.save()
        res.json(updatedProperty)
    } catch (error) {
        res.status(400).json({ message:error.message })
    }
    
})

//delete one
router.delete('/:id', getProperty, async (req,res) => {
    try {
        await res.property.remove()
        res.json({ message: "Property deleted"})
    } catch(error) {
        res.status(500).json({ message:error.message })
    }
})


module.exports = router