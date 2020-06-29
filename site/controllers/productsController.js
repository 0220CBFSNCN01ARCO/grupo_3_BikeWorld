const fs = require('fs')
const path = require('path')

let productos = []
fs.readFile('site/src/data/products.json', 'utf-8', (err, data) => {
  if (err) {
    throw err
  }

  productos = JSON.parse(data)
})

const productosController = {
  showProductCreationForm: (req, res) => {
    return res.render('productAdd')
  },
  createProduct: (req, res) => {
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
  showProductDetails: (req, res) => {
    // Primero obtenemos el producto en cuestión
    let producto = productos[req.params.id]

    // Luego lo clonamos
    producto = JSON.parse(JSON.stringify(producto))

    // Y corregimos la propiedad image
    producto.image = path.resolve('/images', 'products', producto.image)

    return res.render('productDetail', producto)
  }
}

module.exports = productosController
