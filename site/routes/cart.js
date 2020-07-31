import { Router } from 'express'
import { showCart } from '../controllers/cartController'

const router = Router()

// GET /cart
router.get('/', showCart)

export default router
