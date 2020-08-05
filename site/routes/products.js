import multer, { diskStorage } from 'multer'
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

const storage = diskStorage({
  destination: (req, file, cb) => cb(null, 'site/public/images/products/'),
  filename: (req, file, cb) =>
    cb(null, `${file.fieldname}-${Date.now()}${extname(file.originalname)}`)
})

const upload = multer({ storage: storage })
export const productsRouter = Router()

// GET /products
productsRouter.get('/', showProductList)

// GET /products/create
productsRouter.get('/create', showProductCreationForm)

// GET /products/:id
productsRouter.get('/:id', showProductDetails)

// POST /products
productsRouter.post('/', upload.single('image'), createProduct)

// GET /products/:id/edit
productsRouter.get('/:id/edit', showProductEditForm)

// PUT /products/:id
productsRouter.put('/:id', upload.single('image'), editProduct)

// DELETE /products/:id
productsRouter.delete('/:id', deleteProduct)
