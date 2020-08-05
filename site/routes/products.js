import multer, { diskStorage, MulterError } from 'multer'
import { extname } from 'path'
import { Router } from 'express'
import {
  showProductList,
  showProductCreationForm,
  showProductDetails,
  createProduct,
  showProductEditForm,
  editProduct,
  deleteProduct
} from '../controllers/productsController'
import { body } from 'express-validator'

const storage = diskStorage({
  destination: (req, file, cb) => cb(null, 'site/public/images/products/'),
  filename: (req, file, cb) =>
    cb(null, `${file.fieldname}-${Date.now()}${extname(file.originalname)}`)
})

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/png' || file.mimetype === 'image/gif')
    {
      cb(null, true)
    } else {
      cb(null, false)
      return cb(new Error('La imagen seleccionada no es válida'))
    }
  }
})

export const productsRouter = Router()

// GET /products
productsRouter.get('/', showProductList)

// GET /products/create
productsRouter.get('/create', showProductCreationForm)

// GET /products/:id
productsRouter.get('/:id', showProductDetails)

// POST /products
productsRouter.post('/', [
  body('name').exists({ checkFalsy: true }).withMessage('Ingrese un nombre').trim()
    .isLength({ min: 5 }).withMessage('El nombre debe tener al menos 5 caracteres de largo'),
  body('price').exists({ checkFalsy: true }).withMessage('Ingrese un precio')
    .isNumeric().withMessage('El precio debe ser un número')
    .toFloat(),
  body('discount').isNumeric().withMessage('El descuento debe ser un número')
    .toFloat().custom(value => {
      if (value > 100) {
        Promise.reject('El descuento no puede ser más del 100%')
      }
    }),
  body('category').exists({ checkFalsy: true }).withMessage('Ingrese una categoría').trim(),
  body('description').trim().isLength({ min: 20 }).withMessage('La descripción debe tener al menos 20 caracteres'),
  body('status').exists({ checkFalsy: true }).withMessage('Ingrese un estado').trim()
], (req, res, next) => {
  upload.single('image')(req, res, err => {
    if (err instanceof MulterError) {
      req.body.multerError = err
      next()
    } else if (err) {
      next(err)
    } else {
      next()
    }
  })
}, createProduct)

// GET /products/:id/edit
productsRouter.get('/:id/edit', showProductEditForm)

// PUT /products/:id
productsRouter.put('/:id', [
  body('name').exists({ checkFalsy: true }).withMessage('Ingrese un nombre').trim()
    .isLength({ min: 5 }).withMessage('El nombre debe tener al menos 5 caracteres de largo'),
  body('price').exists({ checkFalsy: true }).withMessage('Ingrese un precio')
    .isNumeric().withMessage('El precio debe ser un número')
    .toFloat(),
  body('discount').isNumeric().withMessage('El descuento debe ser un número')
    .toFloat().custom(value => {
      if (value > 100) {
        Promise.reject('El descuento no puede ser más del 100%')
      }
    }),
  body('category').exists({ checkFalsy: true }).withMessage('Ingrese una categoría').trim(),
  body('description').trim().isLength({ min: 20 }).withMessage('La descripción debe tener al menos 20 caracteres'),
  body('status').exists({ checkFalsy: true }).withMessage('Ingrese un estado').trim()
], (req, res, next) => {
  upload.single('image')(req, res, err => {
    if (err instanceof MulterError) {
      req.body.multerError = err
      next()
    } else if (err) {
      next(err)
    } else {
      next()
    }
  })
}, editProduct)

// DELETE /products/:id
productsRouter.delete('/:id', deleteProduct)
