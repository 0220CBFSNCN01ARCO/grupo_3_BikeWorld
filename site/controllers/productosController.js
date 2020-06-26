const fs = require('fs')

let productos = []
fs.readFile('site/src/data/products.json', 'utf-8', (err, data) => {
  if (err) {
    throw err
  }

  productos = JSON.parse(data)
})

const productosController = {
  viewCreateForm: (req, res) => {
    return res.render('productAdd')
  },
  addProduct: (req, res) => {
    productos.push({
      id: productos.length + 1,
      name: req.body.name,
      price: Number(req.body.price),
      discount: Number(req.body.discount),
      category: req.body.category,
      description: req.body.description,
      image: req.file.filename,
      status: req.body.status
    })

    fs.writeFile('site/src/data/products.json', JSON.stringify(productos, null, 2), (err) => {
      if (err) {
        throw err
      }

      return res.redirect('/products/create')
    })
  },
  viewDetail: (req, res) => {
    return res.render('productDetail', {
      id: 2,
      name: 'Medidor de cadena',
      price: 356,
      discount: 0,
      category: 'Accesorios',
      description: 'Medidor de desgaste de cadena en 1 y 0.75.',
      image: "/images/products/image-1592795357323.jpg",
      status: 'destacado'
    })
  }
}

module.exports = productosController
