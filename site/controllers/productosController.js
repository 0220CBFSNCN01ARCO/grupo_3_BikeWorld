const productosController = {
  showView: (req, res) => {
    return res.render('productAdd')
  },
  addProduct: (req, res) => {
    console.log(req.body)
    console.log(req.file)
    return res.redirect('/products/add')
  }
}

module.exports = productosController
