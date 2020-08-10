import { Router } from 'express'
import { showCart, addProductToCart } from '../controllers/cartController'
import { doNotAccessIfNotLoggedIn } from '../middlewares/userRestrictionsMiddleware'

export const cartRouter = Router()

// GET /cart
cartRouter.get('/', doNotAccessIfNotLoggedIn, showCart)

// POST /cart/add
cartRouter.post('/add', doNotAccessIfNotLoggedIn, addProductToCart)
