import { join } from 'path'
import db from '../database/models'
import { validationResult } from 'express-validator'
import { Op } from 'sequelize'

const getProductImagePath = imageFilename => join('/images/products', imageFilename)

const toThousand = number => number.toString()
  .replace('.', ',')
  .replace(/\B(?=(\d{3})+(?!\d))/g, '.')

export const showProductList = async (req, res, next) => {
  try {
    const filters = {
      where: {}
    }

    if (req.query.selectedCategory) {
      filters.where['productCategoryId'] = req.query.selectedCategory
    }

    if (req.query.q) {
      filters.where['name'] = {
        [Op.like]: `%${req.query.q}%`
      }

      filters.where['description'] = {
        [Op.like]: `%${req.query.q}%`
      }
    }

    res.render('productList', {
      products: await db.Product.findAll(filters),
      getProductImagePath: getProductImagePath,
      toThousand: toThousand,
      categories: await db.ProductCategory.findAll(),
      states: await db.ProductStatus.findAll(),
      selectedCategory: req.query.selectedCategory ?
        await db.ProductCategory.findByPk(req.query.selectedCategory) : undefined,
      logged: req.logged
    })
  } catch (err) {
    next(err)
  }
}

export const showProductCreationForm = async (req, res, next) => {
  try {
    const errors = req.session.errors
    req.session.errors = undefined
    res.render('productCreationForm', {
      errors,
      categories: await db.ProductCategory.findAll(),
      states: await db.ProductStatus.findAll(),
      logged: req.logged
    })
  } catch (err) {
    next(err)
  }
}

export const createProduct = async (req, res, next) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      req.session.errors = errors.array({ onlyFirstError: true })
      return res.redirect('/products/create')
    } else if (req.body.multerError) {
      req.session.errors = [
        {
          location: 'body',
          msg: req.body.multerError.message,
          param: 'image'
        }
      ]
      return res.redirect('/products/create')
    }

    let category = await db.ProductCategory.findOne({ where: { name: req.body.category } })
    if (category === null) {
      category = await db.ProductCategory.create({ name: req.body.category })
    }

    let status = await db.ProductStatus.findOne({ where: { name: req.body.status } })
    if (status === null) {
      status = await db.ProductStatus.create({ name: req.body.status })
    }

    await db.Product.create({
      name: req.body.name,
      price: req.body.price,
      discount: req.body.discount,
      productCategoryId: category.id,
      description: req.body.description,
      image: req.file.filename,
      productStatusId: status.id
    })

    res.redirect('/products')
  } catch (err) {
    next(err)
  }
}

export const showProductDetails = async (req, res, next) => {
  try {
    res.render('productDetails', {
      product: await db.Product.findByPk(req.params.id),
      getProductImagePath: getProductImagePath,
      newlineToBr: text => text.replace(/\r\n/g, '<br>'),
      logged: req.logged
    })
  } catch (err) {
    next(err)
  }
}

export const showProductEditForm = async (req, res, next) => {
  try {
    const errors = req.session.errors
    req.session.errors = undefined
    res.render('productEditForm', {
      errors,
      product: await db.Product.findByPk(req.params.id, {
        include: [
          { association: 'status' },
          { association: 'category' }
        ]
      }),
      getProductImagePath: getProductImagePath,
      categories: await db.ProductCategory.findAll(),
      states: await db.ProductStatus.findAll(),
      logged: req.logged
    })
  } catch (err) {
    next(err)
  }
}

export const editProduct = async (req, res, next) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      req.session.errors = errors.array({ onlyFirstError: true })
      return res.redirect(`/products/${req.params.id}/edit`)
    } else if (req.body.multerError) {
      req.session.errors = [
        {
          location: 'body',
          msg: req.body.multerError.message,
          param: 'image'
        }
      ]
      return res.redirect(`/products/${req.params.id}/edit`)
    }

    const product = db.Product.findByPk(req.params.id)
    if (!product) {
      throw new Error('The product specified does not exists!')
    }

    if (req.body.name) {
      product.name = req.body.name
    }

    if (req.body.price) {
      product.price = req.body.price
    }

    if (req.body.discount) {
      product.discount = req.body.discount
    }

    if (req.body.category) {
      let category = await db.ProductCategory.findOne({ where: { name: req.body.category } })
      if (!category) {
        category = await db.ProductCategory.create({ name: req.body.category })
      }

      product.productCategoryId = category.id
    }

    if (req.body.description) {
      product.description = req.body.description
    }

    if (req.file) {
      product.image = req.file.filename
    }

    if (req.body.status) {
      let status = await db.ProductStatus.findOne({ where: { name: req.body.category } })
      if (!status) {
        status = await db.ProductStatus.create({ name: req.body.category })
      }

      product.productStatusId = status.id
    }

    await product.save()
    res.redirect('/products')
  } catch (err) {
    next(err)
  }
}

export const deleteProduct = async (req, res, next) => {
  try {
    await db.Product.destroy({
      where: {
        id: req.params.id
      }
    })

    res.redirect('/products')
  } catch (err) {
    next(err)
  }
}
