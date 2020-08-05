import { Router } from 'express'
import { showRegistrationForm } from '../controllers/usersController'

export const usersRouter = Router()

// GET /users/register
usersRouter.get('/register', showRegistrationForm)

usersRouter.post('/register',(req, res)=>{
  res.send('hola')
})

usersRouter.post('/login',(req, res)=>{
  res.send('hola')
})
