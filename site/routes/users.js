import { Router } from 'express'
import { showRegistrationForm } from '../controllers/usersController'

const router = Router()

// GET /users/register
router.get('/register', showRegistrationForm)

export default router
