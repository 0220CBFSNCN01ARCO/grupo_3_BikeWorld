const express = require('express')
const productsController = require('../controllers/productsController')
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

// GET /products
router.get('/', productsController.showProductList)

// GET /products/create
router.get('/create', productsController.showProductCreationForm)

// GET /products/:id
router.get('/:id', productsController.showProductDetails)

// POST /products
router.post('/', upload.single('image'), productsController.createProduct)

// GET /products/:id/edit
router.get('/:id/edit', productsController.showProductEditForm)

// PUT /products/:id
router.put('/:id', productsController.editProduct)

// DELETE /products/:id
router.delete('/:id', productsController.deleteProduct)

module.exports = router
