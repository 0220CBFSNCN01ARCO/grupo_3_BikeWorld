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
import { body, checkSchema } from 'express-validator'
import { doNotAccessIfNotAdmin } from '../middlewares/userRestrictionsMiddleware'
import validator from 'validator'

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
      return cb(new MulterError('La imagen seleccionada no es válida'))
    }
  }
})

export const productsRouter = Router()

// GET /products
productsRouter.get('/', showProductList)

// GET /products/create
productsRouter.get('/create', doNotAccessIfNotAdmin, showProductCreationForm)

// GET /products/:id
productsRouter.get('/:id', showProductDetails)

// POST /products
productsRouter.post('/', doNotAccessIfNotAdmin, (req, res, next) => {
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
}, [
  body('name').exists({ checkFalsy: true }).withMessage('Ingrese un nombre').trim()
    .isLength({ min: 5 }).withMessage('El nombre debe tener al menos 5 caracteres de largo'),
  body('price').exists({ checkFalsy: true }).withMessage('Ingrese un precio')
    .isNumeric().withMessage('El precio debe ser un número')
    .toFloat(),
  body('discount').isNumeric().withMessage('El descuento debe ser un número')
    .toFloat().custom(value => {
      if (value > 100) {
        throw new Error('El descuento no puede ser más del 100%')
      }

      return true
    }),
  body('category').exists({ checkFalsy: true }).withMessage('Ingrese una categoría').trim(),
  body('description').trim().custom(value => {
    if (value !== '' && !validator.isLength(value, { min: 20 })) {
      throw new Error('La descripción debe tener al menos 20 caracteres')
    }

    return true
  }),
  body('status').exists({ checkFalsy: true }).withMessage('Ingrese un estado').trim()
], createProduct)

// GET /products/:id/edit
productsRouter.get('/:id/edit', doNotAccessIfNotAdmin, showProductEditForm)

// PUT /products/:id
productsRouter.put('/:id', doNotAccessIfNotAdmin, (req, res, next) => {
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
}, [
  body('name').exists({ checkFalsy: true }).withMessage('Ingrese un nombre').trim()
    .isLength({ min: 5 }).withMessage('El nombre debe tener al menos 5 caracteres de largo'),
  body('price').exists({ checkFalsy: true }).withMessage('Ingrese un precio')
    .isNumeric().withMessage('El precio debe ser un número')
    .toFloat(),
  body('discount').isNumeric().withMessage('El descuento debe ser un número')
    .toFloat().custom(value => {
      if (value > 100) {
        throw new Error('El descuento no puede ser más del 100%')
      }

      return true
    }),
  body('category').exists({ checkFalsy: true }).withMessage('Ingrese una categoría').trim(),
  body('description').trim().custom(value => {
    if (value !== '' && !validator.isLength(value, { min: 20 })) {
      throw new Error('La descripción debe tener al menos 20 caracteres')
    }

    return true
  }),
  body('status').exists({ checkFalsy: true }).withMessage('Ingrese un estado').trim()
], editProduct)

// DELETE /products/:id
productsRouter.delete('/:id', doNotAccessIfNotAdmin, deleteProduct)
