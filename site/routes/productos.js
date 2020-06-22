const express = require('express')
const productosController = require('../controllers/productosController')
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
router.get('/create', (req, res) => {
  return productosController.viewCreateForm(req, res)
})

// GET /products/:id
router.get('/:id', (req, res) => {
  return productosController.viewDetail(req, res)
})

// POST /products
router.post('/', upload.single('image'), (req, res, next) => {
  return productosController.addProduct(req, res)
})

module.exports = router
