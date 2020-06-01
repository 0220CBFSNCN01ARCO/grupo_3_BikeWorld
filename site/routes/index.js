var express = require('express')
var mainController = require('../controllers/mainController')
var router = express.Router()

/* GET home page. */
router.get('/', function(req, res, next) {
  mainController.index(req, res)
});
router.get('/home', function(req, res, next){
  mainController.home(req,res)
})
module.exports = router
