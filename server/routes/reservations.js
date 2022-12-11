const express = require('express')
const router = express.Router()
const Reservation = require('../models/reservation')

//list all
router.get('/:userId', async (req,res) => {
    try{
        const reservations = await Reservation.find({
            userId : req.params.userId
        })
        res.send(reservations)
    } catch(error) {
        res.status(500).json({ message:error.message })
    }
})

//get one helper
async function getReservation(req,res,next) {
    let reservation
    try {
        reservation = await Reservation.findById(req.params.id)
        if (reservation == null) {
            return res.status(404).json({ message: 'Id not present in reservations'})
        }
    } catch(error) {
        return res.status(500).json({ message:error.message })
    }
    res.reservation = reservation
    next()
}

//list one
router.get('/:id', getReservation, (req,res) => {
    res.json(res.reservation)
})

//add one
router.post('/', async (req,res) => {
    try{
		Reservation.create(req.body, (err, reservations) => {
			if (err) {
				console.log(err);
				return res.status(500).send(err)
			}
            
			res.status(200).json(reservations)
		});

    } catch(error) {
        res.status(400).json({ message:error.message })
    }
})

//update one
router.patch('/:id', getReservation, async (req,res) => {
    try {
        res.reservation.userId = req.body.userId != null ? req.body.userId : res.reservation.userId;
        res.reservation.propertyId = req.body.propertyId != null ? req.body.propertyId : res.reservation.propertyId;
        res.reservation.bookingPrice = req.body.bookingPrice != null ? req.body.bookingPrice : res.reservation.bookingPrice;
        res.reservation.status = req.body.status != null ? req.body.status : res.reservation.status;
        res.reservation.startDate = req.body.startDate != null ? req.body.startDate : res.reservation.startDate;
        res.reservation.endDate = req.body.endDate != null ? req.body.endDate : res.reservation.endDate;
        res.reservation.transaction = req.body.transaction != null ? req.body.transaction : res.reservation.transaction;
        const updatedReservation = await res.reservation.save()
        res.json(updatedReservation)
    } catch (error) {
        res.status(400).json({ message:error.message })
    }
})

//delete one
router.delete('/:id', getReservation, async (req,res) => {
    try {
        await res.reservation.remove()
        res.json({ message: "Reservation deleted"})
    } catch(error) {
        res.status(500).json({ message:error.message })
    }
})


module.exports = router