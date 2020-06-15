const express = require ('express');
const controller= require('../controllers/carritoController');

const router = express.Router();

router.get('/', (req, res) =>{
    controller.verCarrito(req, res)
})

module.exports = router;