import db from '../database/models'
import { verify as _verify } from 'jsonwebtoken'
import { promisify } from 'util'
import { join } from 'path'

const verify = promisify(_verify)

export const showCart = async (req, res, next) => {
  try {
    const payload = await verify(req.session.token, 'our secret')
    const user = await db.User.findOne({ where: { email: payload.user.email } })

    if (!user) {
      throw new Error('El usuario especificado no existe')
    }

    let sale = await db.Sale.findOne({
      where: {
        userId: user.id,
        sale: false
      },
      include: [
        {
          association: 'saleDetails',
          include: 'product'
        }
      ]
    })

    if (!sale) {
      sale = await db.Sale.create({
        date: Date.now(),
        userId: user.id,
        sale: false
      })
    }

    if (!sale.saleDetails) {
      sale.saleDetails = []
    }

    let amountProducts = 0
    let totalPrice = 0
    sale.saleDetails.forEach(saleDetail => {
      amountProducts += saleDetail.amount
      totalPrice += saleDetail.amount * (saleDetail.price * (1 - (saleDetail.discount / 100)))
    })

    res.render('cart', {
      items: sale.saleDetails,
      amountProducts,
      totalPrice: totalPrice.toFixed(2),
      getProductImagePath: imageFilename => join('/images/products', imageFilename),
      logged: req.logged
    })
  } catch (err) {
    next(err)
  }
}

export const makePurchase = async (req, res, next) => {
  try {
    const payload = await verify(req.session.token, 'our secret')
    const user = await db.User.findOne({ where: { email: payload.user.email } })

    if (!user) {
      throw new Error('El usuario especificado no existe')
    }

    let sale = await db.Sale.findOne({
      where: {
        userId: user.id,
        sale: false
      },
      include: 'saleDetails'
    })

    if (!sale) {
      throw new Error('No hay carrito')
    } else if (!sale.saleDetails) {
      throw new Error('El carrito está vacío')
    }

    sale.sale = true
    await sale.save()
    res.redirect('/')
  } catch (err) {
    next(err)
  }
}

export const deleteItem = async (req, res, next) => {
  try {
    const payload = await verify(req.session.token, 'our secret')
    const user = await db.User.findOne({ where: { email: payload.user.email } })

    if (!user) {
      throw new Error('El usuario especificado no existe')
    }

    const saleDetail = await db.SaleDetail.findOne({ where: { id: req.body.itemId }})

    if (!saleDetail) {
      throw new Error('No se encontró el item a eliminar')
    }

    await saleDetail.destroy()

    res.redirect('/cart')
  } catch (err) {
    next(err)
  }
}

export const addProductToCart = async (req, res, next) => {
  try {
    const payload = await verify(req.session.token, 'our secret')
    const user = await db.User.findOne({ where: { email: payload.user.email } })

    if (!user) {
      throw new Error('El usuario especificado no existe')
    }

    let sale = await db.Sale.findOne({
      where: {
        userId: user.id,
        sale: false
      }
    })

    if (!sale) {
      sale = await db.Sale.create({
        userId: user.id,
        date: Date.now(),
        sale: false
      })
    }

    const product = await db.Product.findByPk(req.body.productId)

    if (!product) {
      throw new Error('El producto no existe')
    }

    let saleDetail = await db.SaleDetail.findOne({
      where: {
        saleId: sale.id,
        productId: product.id
      }
    })

    if (!saleDetail) {
      saleDetail = await db.SaleDetail.create({
        saleId: sale.id,
        productId: product.id,
        amount: 1,
        price: product.price,
        discount: product.discount
      })
    } else {
      saleDetail.amount++
      await saleDetail.save()
    }

    res.redirect('/cart')
  } catch (err) {
    next(err)
  }
}
