const express = require('express')
const productosController = require('../controllers/productsController')
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'site/public/images/products/')
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
  }
})

const upload = multer({ storage: storage })

const router = express.Router()

// GET /products/create
router.get('/create', productosController.showProductCreationForm)

// GET /products/:id
router.get('/:id', productosController.showProductDetails)

// POST /products
router.post('/', upload.single('image'), productosController.createProduct)

module.exports = router
