import db from '../database/models'
import { hash, compare } from 'bcrypt'
import { sign as _sign, verify as _verify } from 'jsonwebtoken'
import { promisify } from 'util'
import { validationResult } from 'express-validator'

const sign = promisify(_sign)
const verify = promisify(_verify)

export const showRegistrationForm = (req, res) => {
  const loginErrors = req.session.loginErrors
  const registrationErrors = req.session.registrationErrors
  req.session.loginErrors = undefined
  req.session.registrationErrors = undefined
  res.render('registrationForm', {
    loginErrors,
    registrationErrors
  })
  req.session.loginErrors = undefined
  res.session.registrationErrors = undefined
}

export const registerUser = async (req, res, next) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      req.session.registrationErrors = errors.array({ onlyFirstError: true })
      return res.redirect('/users/register')
    }

    let user = await db.User.findOne({ where: { email: req.body.email }})
    if (user) {
      req.session.registrationErrors = [
        {
          location: 'body',
          msg: 'El email ingresado ya está registrado',
          param: 'email'
        }
      ]
      return res.redirect('/users/register')
    }

    user = await db.User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: await hash(req.body.password, 10),
      userAdmin: false
    })

    if (req.file) {
      user.image = req.file.filename
      await user.save()
    }

    const token = await sign({ user: { email: user.email } }, 'our secret')

    if (req.body.remindMe !== undefined) {
      res.cookie('token', token, {maxAge: 60000})
    } else {
      req.session.token = token
    }

    res.redirect('/')
  } catch (err) {
    next(err)
  }
}

export const loginUser = async (req, res, next) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      req.session.loginErrors = errors.array({ onlyFirstError: true})
      return res.redirect('/users/register')
    }

    const user = await db.User.findOne({ where: { email: req.body.email } })
    if (!user) {
      req.session.loginErrors = [
        {
          location: 'body',
          msg: 'El email ingresado no existe',
          param: 'email'
        }
      ]
      return res.redirect('/users/register')
    }

    if (!await compare(req.body.password, user.password)) {
      req.session.loginErrors = [
        {
          location: 'body',
          msg: 'La contraseña ingresada es incorrecta',
          param: 'password'
        }
      ]
      return res.redirect('/users/register')
    }

    const token = await sign({ user: { email: user.email } }, 'our secret')

    if (req.body.remindMe !== undefined) {
      res.cookie('token', token, {maxAge: 60000})
    } else {
      req.session.token = token
    }

    res.redirect('/')
  } catch (err) {
    next(err)
  }
}

export const updateUserInfo = async (req, res, next) => {
  try {
    const payload = await verify(req.session.token, 'our secret')
    const user = await db.User.findOne({ where: { email: payload.user.email } })

    if (!user) {
      throw 'User specified does not exists!'
    }

    if (req.body.firstName) {
      user.firstName = req.body.firstName
    }

    if (req.body.lastName) {
      user.lastName = req.body.lastName
    }

    if (req.body.email) {
      user.email = req.body.email
    }

    if (req.body.password) {
      user.password = hash(req.body.password, 10)
    }

    if (req.file) {
      user.image = req.file.filename
    }

    await user.save()
    res.redirect('/')
  } catch (err) {
    next(err)
  }
}

export const showUserProfile = async (req, res, next) => {
  try {
    const payload = await verify(req.session.token, 'our secret')
    const user = await db.User.findOne({ where: { email: payload.user.email } })

    if (!user) {
      throw 'User specified does not exists!'
    }

    res.render('userProfile', { user: user })
  } catch (err) {
    next(err)
  }
}

export const deleteUser = async (req, res, next) => {
  try {
    const payload = await verify(req.session.token, 'our secret')
    const user = await db.User.findOne({ where: { email: payload.user.email } })

    if (!user) {
      throw 'User specified does not exists!'
    }

    await user.destroy()
    res.redirect('/')
  } catch (err) {
    next(err)
  }
}
