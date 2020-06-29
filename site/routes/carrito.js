const express = require('express')
const controller = require('../controllers/cartController')

const router = express.Router()

// GET /carrito
router.get('/', (req, res) => {
  return controller.verCarrito(req, res)
})

module.exports = router
