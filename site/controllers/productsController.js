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

const getProductImagePath = imageFilename => {
  return path.resolve('/images/products', imageFilename)
}

module.exports = {
  showProductList: (req, res) => res.render('productList', {
    products: products,
    getProductImagePath: getProductImagePath
  }),
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
      return res.redirect('/products')
    })
  },
  showProductDetails: (req, res) => res.render('productDetails', {
    product: products[req.params.id],
    getProductImagePath: getProductImagePath
  }),
  showProductEditForm: (req, res) => {},
  editProduct: (req, res) => {},
  deleteProduct: (req, res) => {}
}
