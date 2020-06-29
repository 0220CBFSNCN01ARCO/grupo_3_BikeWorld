const fs = require('fs')
const path = require('path')

const products = JSON.parse(fs.readFileSync('site/src/data/products.json', 'utf-8'))

module.exports = {
  showHomePage: (req, res) => res.render('homePage', {
    sales: products.filter(product => {
      return product.status == 'offer'
    }),
    featured: products.filter(product => {
      return product.status == 'featured'
    }),
    toThousand: number => number.toString()
      .replace('.', ',')
      .replace(/\B(?=(\d{3})+(?!\d))/g, '.'),
    getProductImagePath: imageFilename => {
      return path.resolve('/images/products', imageFilename)
    }
  })
}
