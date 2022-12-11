const express = require('express')
const router = express.Router()
const multer = require('multer')

// var storage = multer({
//     destination: '../client/public/',
//     filename: function (req, file, cb) {
//         const suffix = file.mimetype.split("/");
//         cb(null, `${file.fieldname}-${Date.now()}.${suffix[1]}`);
//     },
// })

// var doUpload = multer({
//     storage: storage
// }).array('img', 5)
// var singleUpload = multer(
//     {dest: '../client/public/'}
// )

var multiUpload = multer(
        {dest: '../client/public/'}
    )


//list all
router.get('/', async (req, res) => {
    try {
        const properties = await Property.find()
        res.send(properties)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
//add one
// router.post('/propertyImages', (req, res) => {
//     doUpload(req, res, function (err) {
//         console.log(req.files)
//         if (err) {
//             console.log(err)
//         }
//     })
//     try {
//     } catch (error) {
//         res.status(400).json({ message: error.message })
//     }
// })

router.post('/propertyImages', multiUpload.array('img',5), (req, res) => {
    console.log(req.files)
    // doUpload(req, res, function (err) {
    //     console.log(req.files)
    //     if (err) {
    //         console.log(err)
    //     }
    // })
    try {
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

module.exports = router