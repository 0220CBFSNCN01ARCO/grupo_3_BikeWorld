const express = require('express')
const mainController = require('../controllers/mainController')

const router = express.Router()

// GET /
router.get('/', (req, res, next) => {
  return mainController.index(req, res)
})

// GET /home
router.get('/home', (req, res, next) => {
  return mainController.home(req, res)
})

module.exports = router
