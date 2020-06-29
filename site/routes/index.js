const express = require('express')
const mainController = require('../controllers/mainController')

const router = express.Router()

// GET /
router.get('/', mainController.showHomePage)

module.exports = router
