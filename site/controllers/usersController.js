import db from '../database/models'
import createHttpError from 'http-errors'
import { hash, compare } from 'bcrypt'
import { sign as _sign, verify as _verify } from 'jsonwebtoken'
import { promisify } from 'util'

const sign = promisify(_sign)
const verify = promisify(_verify)

export const showRegistrationForm = (req, res) => res.render('registrationForm')

export const registerUser = async (req, res) => {
  try {
    const user = await db.User.create({
      firstName: req.body.firstName || '',
      lastName: req.body.lastName || '',
      email: req.body.email,
      password: await hash(req.body.password, 10),
      userAdmin: false
    })

    if (req.file) {
      user.image = req.file.filename
      await user.save()
    }

    const token = await sign({ user: { email: user.email } }, 'our secret')
    res.cookie('token', token)
    res.redirect('/')
  } catch (err) {
    createHttpError(500)
    console.error(err)
  }
}

export const loginUser = async (req, res) => {
  try {
    const user = await db.User.findOne({ where: { email: req.body.email } })
    if (!user) {
      return res.render('registrationForm', { error: { login: { email: true } } })
    }

    if (!await compare(req.body.password, user.password)) {
      return res.render('registrationForm', { error: { login: { password: true } } })
    }

    const token = await sign({ user: { email: user.email } }, 'our secret')
    res.cookie('token', token)
    res.redirect('/')
  } catch (err) {
    createHttpError(500)
    console.error(err)
  }
}

export const updateUserInfo = async (req, res) => {
  try {
    const payload = await verify(req.cookies.token, 'our secret')
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
    createHttpError(500)
    console.error(err)
  }
}

export const showUserProfile = async (req, res) => {
  try {
    const payload = await verify(req.cookies.token, 'our secret')
    const user = await db.User.findOne({ where: { email: payload.user.email } })

    if (!user) {
      throw 'User specified does not exists!'
    }

    res.render('userProfile', { user: user })
  } catch (err) {
    createHttpError(500)
    console.error(err)
  }
}

export const deleteUser = async (req, res) => {
  try {
    const payload = await verify(req.cookies.token, 'our secret')
    const user = await db.User.findOne({ where: { email: payload.user.email } })

    if (!user) {
      throw 'User specified does not exists!'
    }

    await user.destroy()
    res.redirect('/')
  } catch (err) {
    createHttpError(500)
    console.error(err)
  }
}
