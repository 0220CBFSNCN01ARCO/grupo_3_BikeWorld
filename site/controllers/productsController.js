import { join } from 'path'
import db from '../database/models'
import createHttpError from 'http-errors'

const getProductImagePath = imageFilename => join('/images/products', imageFilename)

const toThousand = number => number.toString()
  .replace('.', ',')
  .replace(/\B(?=(\d{3})+(?!\d))/g, '.')

export const showProductList = async (req, res) => {
  try {
    res.render('productList', {
      products: await db.Product.findAll(),
      getProductImagePath: getProductImagePath,
      toThousand: toThousand,
      categories: await db.ProductCategory.findAll(),
      states: await db.ProductStatus.findAll()
    })
  } catch (err) {
    createHttpError(500)
    console.error(err)
  }
}

export const showProductCreationForm = async (req, res) => {
  try {
    res.render('productCreationForm', {
      categories: await db.ProductCategory.findAll(),
      states: await db.ProductStatus.findAll()
    })
  } catch (err) {
    createHttpError(500)
    console.error(err)
  }
}

export const createProduct = async (req, res) => {
  try {
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
    createHttpError(500)
    console.error(err)
  }
}

export const showProductDetails = async (req, res) => {
  try {
    res.render('productDetails', {
      product: await db.Product.findByPk(req.params.id),
      getProductImagePath: getProductImagePath,
      newlineToBr: text => text.replace(/\r\n/g, '<br>')
    })
  } catch (err) {
    createHttpError(500)
    console.error(err)
  }
}

export const showProductEditForm = async (req, res) => {
  try {
    res.render('productEditForm', {
      product: await db.Product.findByPk(req.params.id, {
        include: [
          { association: 'status' },
          { association: 'category' }
        ]
      }),
      getProductImagePath: getProductImagePath,
      categories: await db.ProductCategory.findAll(),
      states: await db.ProductStatus.findAll()
    })
  } catch (err) {
    createHttpError(500)
    console.error(err)
  }
}

export const editProduct = async (req, res) => {
  try {
    let category = await db.ProductCategory.findOne({ where: { name: req.body.category } })
    if (category === null) {
      category = await db.ProductCategory.create({ name: req.body.category })
    }

    let status = await db.ProductStatus.findOne({ where: { name: req.body.status } })
    if (status === null) {
      status = await db.ProductStatus.create({ name: req.body.status })
    }

    await db.Product.update({
      name: req.body.name,
      price: req.body.price,
      discount: req.body.discount,
      productCategoryId: category.id,
      description: req.body.description,
      productStatusId: status.id
    }, { where: { id: req.params.id } })

    // No `image: req.file?.filename`? Why JS :(
    if (req.file) {
      await db.Product.update({ image: req.file.filename }, { where: { id: req.params.id } })
    }

    res.redirect('/products')
  } catch (err) {
    createHttpError(500)
    console.error(err)
  }
}

export const deleteProduct = async (req, res) => {
  try {
    await db.Product.destroy({
      where: {
        id: req.params.id
      }
    })

    res.redirect('/products')
  } catch (err) {
    createHttpError(500)
    console.error(err)
  }
}
