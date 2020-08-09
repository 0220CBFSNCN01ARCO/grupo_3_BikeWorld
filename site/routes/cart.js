import { Router } from 'express'
import { showCart } from '../controllers/cartController'
import { doNotAccessIfNotLoggedIn } from '../middlewares/userRestrictionsMiddleware'

export const cartRouter = Router()

// GET /cart
cartRouter.get('/', doNotAccessIfNotLoggedIn, showCart)
