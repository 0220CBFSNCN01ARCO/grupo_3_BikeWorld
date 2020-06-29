const express = require('express')
const usersController = require('../controllers/usersController')

const router = express.Router()

// GET /users/register
router.get('/register', usersController.showRegistrationForm)

module.exports = router
