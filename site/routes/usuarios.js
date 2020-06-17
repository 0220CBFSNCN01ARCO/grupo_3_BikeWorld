const express = require ('express');
const controller= require ('../controllers/usuariosController');

const router = express.Router ();

// GET /user/register
router.get('/register', (req, res) => {
    return controller.registrar (req, res)
})

module.exports = router;
