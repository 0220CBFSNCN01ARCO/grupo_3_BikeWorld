var express = require ('express')
var mainController = require ('../controllers/mainController')

var router = express.Router ()

// GET /
router.get ('/', function (req, res, next) {
    return mainController.index (req, res)
})

// GET /home
router.get ('/home', function (req, res, next){
    return mainController.home (req,res)
})

module.exports = router
