import { Router } from 'express'
import { showCart } from '../controllers/cartController'

export const cartRouter = Router()

// GET /cart
cartRouter.get('/', showCart)
