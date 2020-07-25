const db = require('../database/models')
const path = require('path')

module.exports = {
  showHomePage: async (req, res) => {
    try {
      res.render('homePage', {
        sales: await db.Product.findAll({
          include: [
            {
              association: 'status',
              where: { id: 1 }
            }
          ]
        }),
        featured: await db.Product.findAll({
          include: [
            {
              association: 'status',
              where: { id: 2 }
            }
          ]
        }),
        toThousand: number => number.toString()
          .replace('.', ',')
          .replace(/\B(?=(\d{3})+(?!\d))/g, '.'),
        getProductImagePath: imageFilename => {
          return path.resolve('/images/products', imageFilename)
        }
      })
    } catch (err) {
      console.error(err)
    }
  }
}
