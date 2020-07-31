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
const router = Router()

// GET /products
router.get('/', showProductList)

// GET /products/create
router.get('/create', showProductCreationForm)

// GET /products/:id
router.get('/:id', showProductDetails)

// POST /products
router.post('/', upload.single('image'), createProduct)

// GET /products/:id/edit
router.get('/:id/edit', showProductEditForm)

// PUT /products/:id
router.put('/:id', upload.single('image'), editProduct)

// DELETE /products/:id
router.delete('/:id', deleteProduct)

export default router
