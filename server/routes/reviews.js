const express = require('express')
const router = express.Router()
const Review = require('../models/review')

//list all
router.get('/:propertyId', async (req,res) => {
    try{
        const reviews = await Review.find({
            propertyId : req.params.propertyId
        })
        res.send(reviews)
    } catch(error) {
        res.status(500).json({ message:error.message })
    }
})

module.exports = router