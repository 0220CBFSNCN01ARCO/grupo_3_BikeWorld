import { Router } from 'express'
import { showHomePage } from '../controllers/mainController'

const router = Router()

// GET /
router.get('/', showHomePage)

export default router
