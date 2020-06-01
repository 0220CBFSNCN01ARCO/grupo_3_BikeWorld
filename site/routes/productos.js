const express = require('express')
const productosController = require('../controllers/productosController')

const router = express.Router()

// GET products/add
router.get ('/add', (req, res) => {
    return productosController.add (req, res)
})

module.exports = router
