import { Router } from 'express'
import { showRegistrationForm, registerUser, loginUser } from '../controllers/usersController'
import { body } from 'express-validator'

export const usersRouter = Router()

// GET /users/register
usersRouter.get('/register', showRegistrationForm)

// POST /users/register
usersRouter.post('/register', [
  body('firstName').exists({ checkFalsy: true }).withMessage('Ingrese un nombre').trim()
    .isLength({ min: 2 }).withMessage('El nombre debe tener al menos 2 caracteres'),
  body('lastName').exists({ checkFalsy: true }).withMessage('Ingrese un apellido').trim()
    .isLength({ min: 2 }).withMessage('El apellido debe tener al menos 2 caracteres'),
  body('email').exists({ checkFalsy: true }).withMessage('Ingrese un email').trim()
    .isEmail().withMessage('El email ingresado no es válido'),
  body('password').exists({ checkFalsy: true }).withMessage('Ingrese una contraseña').trim()
    .isLength({ min: 8 })
    .withMessage('La contraseña debe tener al menos 8 caracteres')
    .matches(/[A-Z]/).withMessage('La contraseña debe tener al menos 1 letra mayúscula')
    .matches(/[a-z]/).withMessage('La contraseña debe tener al menos 1 letra minúscula')
    .matches(/\d/).withMessage('La contraseña debe tener al menos 1 número')
    .matches(/\W/).withMessage('La contraseña debe tener al menos 1 caracter especial'),
  body('passwordRepeat').exists({ checkFalsy: true }).withMessage('Repita la contraseña').trim()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Las contraseñas no coinciden')
      }

      return true
    }),
], registerUser)

// POST /users/login
usersRouter.post('/login', [
  body('email').exists({ checkFalsy: true }).withMessage('Ingrese un email').trim()
    .isEmail().withMessage('El email ingresado no es válido'),
  body('password').exists({ checkFalsy: true }).withMessage('Ingrese una contraseña').trim()
], loginUser)
