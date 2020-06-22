const productosController = {
  viewCreateForm: (req, res) => {
    return res.render('productAdd')
  },
  addProduct: (req, res) => {
    console.log(req.body)
    console.log(req.file)
    return res.redirect('/products/add')
  },

  viewDetail: (req, res) => {
    return res.render('productDetail', {
      id: 2,
      name: 'Medidor de cadena',
      price: 356,
      discount: 0,
      category: 'Accesorios',
      description: 'Medidor de desgaste de cadena en 1 y 0.75.',
      image: 'medidorCadena.jpg',
      status: 'destacado'
    })
  }
}

module.exports = productosController
