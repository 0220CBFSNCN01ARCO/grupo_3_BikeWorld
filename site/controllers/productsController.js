const fs = require('fs')
const path = require('path')

var products = JSON.parse(fs.readFileSync('site/src/data/products.json', 'utf-8'))

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
      id: Number(products[products.length - 1].id + 1),
      name: req.body.name,
      price: Number(req.body.price),
      discount: Number(req.body.discount),
      category: req.body.category,
      description: req.body.description,
      image: req.file.filename,
      status: req.body.status
    })

    updateProducts(() => res.redirect('/products'))
  },
  showProductDetails: (req, res) => res.render('productDetails', {
    product: products.find(product => {
      return product.id == req.params.id
    }),
    getProductImagePath: getProductImagePath
  }),
  showProductEditForm: (req, res) => res.render('productEditForm', {
    product: products.find(product => {
      return product.id == req.params.id
    }),
    getProductImagePath: getProductImagePath
  }),
  editProduct: (req, res) => {
    const productIndex = products.findIndex(product => {
      return product.id == req.params.id
    })

    products[productIndex] = {
      id: Number(req.params.id),
      name: req.body.name,
      price: Number(req.body.price),
      discount: Number(req.body.discount),
      category: req.body.category,
      description: req.body.description,
      status: req.body.status
    }

    // No `image: req.file?.filename`? Why JS :(
    if (req.file) {
      products[productIndex].image = req.file.filename
    }

    updateProducts(() => res.redirect('/products'))
  },
  deleteProduct: (req, res) => {
    products = products.filter(product => {
      return product.id != req.params.id
    })

    updateProducts(() => res.redirect('/products'))
  }
}
