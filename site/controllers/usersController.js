import db from '../database/models'
import { hash, compare } from 'bcrypt'
import { sign as _sign, verify as _verify } from 'jsonwebtoken'
import { promisify } from 'util'
import { validationResult } from 'express-validator'

const sign = promisify(_sign)
const verify = promisify(_verify)

export const showRegistrationForm = (req, res) => res.render('registrationForm')

export const registerUser = async (req, res, next) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.render('registrationForm', { registrationErrors: errors.array() })
    } else if (req.body.multerError) {
      return res.render('registrationForm', {
        registrationErrors: [
          {
            location: 'body',
            msg: req.body.multerError.message,
            param: 'avatar'
          }
        ]
      })
    }

    let user = db.User.findOne({ where: { email: req.body.email }})
    if (user) {
      return res.render('registrationForm', {
        registrationErrors: [
          {
            location: 'body',
            msg: 'El email ingresado ya está registrado',
            param: 'email'
          }
        ]
      })
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
      return res.render('registrationForm', { loginErrors: errors.array() })
    }


    const user = await db.User.findOne({ where: { email: req.body.email } })
    if (!user) {
      return res.render('registrationForm', {
        loginErrors: [
          {
            location: 'body',
            msg: 'El email ingresado no existe',
            param: 'email'
          }
        ]
      })
    }

    if (!await compare(req.body.password, user.password)) {
      return res.render('registrationForm', {
        loginErrors: [
          {
            location: 'body',
            msg: 'La contraseña ingresada es incorrecta',
            param: 'password'
          }
        ]
      })
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
