const express = require('express')
const router = express.Router()
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, '../client/public')
    },
    filename: function (req, file, cb) {
        const suffix = file.originalname.split('.')
        cb(null, file.fieldname + '-' + suffix[0] + '.' + suffix[1])
    }
})

var upload = multer({ storage: storage })

//list all
router.get('/', async (req, res) => {
    try {
        const properties = await Property.find()
        res.send(properties)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.post('/propertyImages', upload.array('img',5), (req, res) => {
    console.log(req.files)
    try {
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

module.exports = router