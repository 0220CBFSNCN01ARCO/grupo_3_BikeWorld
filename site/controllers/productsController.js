const fs = require('fs')
const path = require('path')

const products = JSON.parse(fs.readFileSync('site/src/data/products.json', 'utf-8'))

const updateProducts = callback => {
  fs.writeFile('site/src/data/products.json', JSON.stringify(products, null, 2), err => {
    if (err) {
      throw err
    }

    callback()
  })
}

module.exports = {
  showProductCreationForm: (req, res) => res.render('productCreationForm'),
  createProduct: (req, res) => {
    products.push({
      id: products.length + 1,
      name: req.body.name,
      price: Number(req.body.price),
      discount: Number(req.body.discount),
      category: req.body.category,
      description: req.body.description,
      image: req.file.filename,
      status: req.body.status
    })

    updateProducts(() => {
      return res.redirect('/products/create')
    })
  },
  showProductDetails: (req, res) => {
    // Primero obtenemos el producto en cuestión
    let producto = products[req.params.id]

    // Luego lo clonamos
    producto = JSON.parse(JSON.stringify(producto))

    // Y corregimos la propiedad image
    producto.image = path.resolve('/images', 'products', producto.image)

    return res.render('productDetails', producto)
  }
}
