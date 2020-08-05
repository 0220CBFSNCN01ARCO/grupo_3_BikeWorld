import { Router } from 'express'
import { showHomePage } from '../controllers/mainController'

export const indexRouter = Router()

// GET /
indexRouter.get('/', showHomePage)
