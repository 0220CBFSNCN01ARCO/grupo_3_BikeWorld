import { Router } from 'express'
import { showRegistrationForm, registerUser, loginUser } from '../controllers/usersController'
import { body } from 'express-validator'
import multer, { diskStorage, MulterError } from 'multer'
import { extname } from 'path'

const storage = diskStorage({
  destination: (req, file, cb) => cb(null, 'site/public/images/users/'),
  filename: (req, file, cb) =>
    cb(null, `${file.fieldname}-${Date.now()}${extname(file.originalname)}`)
})

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/png' || file.mimetype === 'image/gif')
    {
      cb(null, true)
    } else {
      cb(null, false)
      return cb(new Error('La imagen seleccionada no es válida'))
    }
  }
})

export const usersRouter = Router()

// GET /users/register
usersRouter.get('/register', showRegistrationForm)

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
  body('passwordRepeat').trim().custom((value, { req }) => {
    if (value !== req.body.password) {
      return Promise.reject('Las contraseñas no coinciden')
    }
  }),
], (req, res, next) => {
  upload.single('avatar')(req, res, err => {
    if (err instanceof MulterError) {
      req.body.multerError = err
      next()
    } else if (err) {
      next(err)
    } else {
      next()
    }
  })
}, registerUser)

usersRouter.post('/login', [
  body('email').exists({ checkFalsy: true }).withMessage('Ingrese un email').trim()
    .isEmail().withMessage('El email ingresado no es válido'),
  body('password').exists({ checkFalsy: true }).withMessage('Ingrese una contraseña').trim()
], loginUser)
