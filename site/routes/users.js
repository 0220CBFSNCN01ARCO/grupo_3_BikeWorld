import { Router } from 'express'
import { showRegistrationForm, registerUser, loginUser, showUserProfile, updateUserInfo } from '../controllers/usersController'
import { body } from 'express-validator'
import { doNotAccessIfLoggedIn, doNotAccessIfNotLoggedIn } from '../middlewares/userRestrictionsMiddleware'
import validator from 'validatorjs'

export const usersRouter = Router()

// GET /users/login
usersRouter.get('/login', doNotAccessIfLoggedIn, showRegistrationForm)

// GET /users/profile
usersRouter.get('/profile', doNotAccessIfNotLoggedIn, showUserProfile)

// POST /users
usersRouter.post('/', doNotAccessIfLoggedIn, [
  body('firstName').exists({ checkFalsy: true }).withMessage('Ingrese un nombre').trim()
    .isLength({ min: 2 }).withMessage('El nombre debe tener al menos 2 caracteres'),
  body('lastName').exists({ checkFalsy: true }).withMessage('Ingrese un apellido').trim()
    .isLength({ min: 2 }).withMessage('El apellido debe tener al menos 2 caracteres'),
  body('email').exists({ checkFalsy: true }).withMessage('Ingrese un email').trim()
    .isEmail().withMessage('El email ingresado no es válido'),
  body('password').exists({ checkFalsy: true }).withMessage('Ingrese una contraseña')
    .isLength({ min: 8 })
    .withMessage('La contraseña debe tener al menos 8 caracteres')
    .matches(/[A-Z]/).withMessage('La contraseña debe tener al menos 1 letra mayúscula')
    .matches(/[a-z]/).withMessage('La contraseña debe tener al menos 1 letra minúscula')
    .matches(/\d/).withMessage('La contraseña debe tener al menos 1 número'),
  body('passwordRepeat').exists({ checkFalsy: true }).withMessage('Repita la contraseña')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Las contraseñas no coinciden')
      }

      return true
    }),
], registerUser)

// POST /users/login
usersRouter.post('/login', doNotAccessIfLoggedIn, [
  body('email').exists({ checkFalsy: true }).withMessage('Ingrese un email').trim()
    .isEmail().withMessage('El email ingresado no es válido'),
  body('password').exists({ checkFalsy: true }).withMessage('Ingrese una contraseña').trim()
], loginUser)

// PUT /users/:id
usersRouter.put('/:id', doNotAccessIfNotLoggedIn, [
  body('firstName').exists({ checkFalsy: true }).withMessage('Ingrese un nombre').trim()
    .isLength({ min: 2 }).withMessage('El nombre debe tener al menos 2 caracteres'),
  body('lastName').exists({ checkFalsy: true }).withMessage('Ingrese un apellido').trim()
    .isLength({ min: 2 }).withMessage('El apellido debe tener al menos 2 caracteres'),
  body('email').exists({ checkFalsy: true }).withMessage('Ingrese un email').trim()
    .isEmail().withMessage('El email ingresado no es válido'),
  body('password').custom(value => {
    if (value !== undefined && value !== '' && value !== 0 && value !== false) {
      if (!validator.isLength(value, { min: 8 })) {
        throw new Error('La contraseña debe tener al menos 8 caracteres')
      } else if (!validator.matches(value, /[A-Z]/)) {
        throw new Error('La contraseña debe tener al menos 1 letra mayúscula')
      } else if (!validator.matches(value, /[a-z]/)) {
        throw new Error('La contraseña debe tener al menos 1 letra minúscula')
      } else if (!validator.matches(value, /\d/)) {
        throw new Error('La contraseña debe tener al menos 1 número')
      }

      return true
    }
  }),
  body('passwordRepeat').custom((value, { req }) => {
    if (req.body.password !== undefined && req.body.password !== '' && req.body.password !== 0 && req.body.password !== false) {
      if (value === undefined || value === '' || value === 0 || value === false) {
        throw new Error('Repita la contraseña')
      } else if (value !== req.body.password) {
        throw new Error('Las contraseñas no coinciden')
      }

      return true
    }
  })
], updateUserInfo)
