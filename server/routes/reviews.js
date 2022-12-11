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

//add one
router.post('/', async (req,res) => {
    try{
        console.log(req.body)
		Review.create(req.body, (err, reviews) => {
			if (err) {
				console.log(err);
				return res.status(500).send(err)
			}
            
			res.status(200).json(reviews)
		});

    } catch(error) {
        res.status(400).json({ message:error.message })
    }
})

module.exports = router