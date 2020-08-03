import { Router } from 'express'
import { showRegistrationForm } from '../controllers/usersController'

const router = Router()

// GET /users/register
router.get('/register', showRegistrationForm)

router.post('/register',(req, res)=>{
  res.send('hola')
})

router.post('/login',(req, res)=>{
  res.send('hola')
})
export default router
