const express = require('express')
const Favorite = require('../models/favorite')
const router = express.Router()

//list all
router.get('/', async (req,res) => {
    try{
        const favorites = await Favorite.find()
        res.send(favorites)
    } catch(error) {
        res.status(500).json({ message:error.message })
    }
})

//list per userId
router.get('/user/:id', async (req,res) => {
    try{
        const favorites = await Favorite.find({
            userId: req.params.id
        })
        res.send(favorites)
    } catch(error) {
        res.status(500).json({ message:error.message })
    }
})

//Entry for user id and propertyId
router.get('/userproperty/', async (req,res) => {
    try{
        const {userId, propertyId} = req.query;
        console.log(userId)
        console.log(propertyId)
        const favorites = await Favorite.find({
            userId: userId,
            propertyId: propertyId
        })
        res.send(favorites)
    } catch(error) {
        res.status(500).json({ message:error.message })
    }
})

//add one
router.post('/', async (req,res) => {
    try{
        console.log(req.body)
        const favorite = new Favorite({
            userId : req.body.userId,
            propertyId : req.body.propertyId
        })
        const newfavorite = await favorite.save()
        res.status(200).json(newfavorite)
    } catch(error) {
        res.status(400).json({ message:error.message })
    }
})

//get one helper
async function getFavorite(req,res,next) {
    let favorite
    try {
        favorite = await Favorite.findById(req.params.id)
        if (favorite == null) {
            return res.status(404).json({ message: 'Id not present in favorites'})
        }
    } catch(error) {
        return res.status(500).json({ message:error.message })
    }
    res.favorite = favorite
    next()
}

//delete one
router.get('/remove/:id', getFavorite, async (req,res) => {
    try {
        await res.favorite.remove()
        res.json({ message: "Favorite deleted"})
    } catch(error) {
        res.status(500).json({ message:error.message })
    }
})


module.exports = router