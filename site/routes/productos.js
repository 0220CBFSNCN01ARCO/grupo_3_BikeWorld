const express = require('express')
const productosController = require('../controllers/productosController')
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'site/public/img/products/')
    },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({ storage: storage })

const router = express.Router()

// GET products/add
router.get ('/add', (req, res) => {
    return productosController.showView (req, res)
})

// POST products/add
router.post ('/add', upload.single('imagen'), (req, res, next) => {
    return productosController.addProduct (req, res)
})

module.exports = router
