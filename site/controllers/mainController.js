import db from '../database/models'
import { join } from 'path'
import createHttpError from 'http-errors'

export const showHomePage = async (req, res) => {
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
      getProductImagePath: imageFilename => join('/images/products', imageFilename)
    })
  } catch (err) {
    createHttpError(500)
    console.error(err)
  }
}
