const express = require ('express');
const controller= require('../controllers/usuariosController');

const router = express.Router();

router.get('/register', (req, res) =>{
    controller.registrar(req, res)
})

module.exports = router;