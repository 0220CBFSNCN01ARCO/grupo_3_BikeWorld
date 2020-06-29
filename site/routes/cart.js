const express = require('express')
const cartController = require('../controllers/cartController')

const router = express.Router()

// GET /cart
router.get('/', cartController.showCart)

module.exports = router
