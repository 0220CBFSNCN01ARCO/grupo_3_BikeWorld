const mainController = {
    index: function (req, res) {
        res.render('index', { title: 'Express', mensaje: 'Basta chicos' })
    }
}

module.exports = mainController
