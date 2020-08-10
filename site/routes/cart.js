import { Router } from 'express'
import { showCart, addProductToCart, makePurchase, deleteItem } from '../controllers/cartController'
import { doNotAccessIfNotLoggedIn } from '../middlewares/userRestrictionsMiddleware'

export const cartRouter = Router()

// GET /cart
cartRouter.get('/', doNotAccessIfNotLoggedIn, showCart)

// POST /cart/add
cartRouter.post('/add', doNotAccessIfNotLoggedIn, addProductToCart)

// POST /cart/buy
cartRouter.post('/buy', doNotAccessIfNotLoggedIn, makePurchase)

// DELETE /cart
cartRouter.delete('/', doNotAccessIfNotLoggedIn, deleteItem)
