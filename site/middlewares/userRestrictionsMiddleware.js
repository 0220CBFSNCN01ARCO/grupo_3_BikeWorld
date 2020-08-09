import { verify as _verify } from 'jsonwebtoken'
import { promisify } from 'util'
import db from '../database/models'

const verify = promisify(_verify)

export const doNotAccessIfLoggedIn = async (req, res, next) => {
  try {
    if (req.session.token) {
      const payload = await verify(req.session.token, 'our token')
      const user = await db.User.findOne({ where: { email: payload.user.email } })

      if (user) {
        return res.redirect('/')
      } else {
        return next()
      }
    }

    next()
  } catch (err) {
    next(err)
  }
}

export const doNotAccessIfNotLoggedIn = async (req, res, next) => {
  try {
    if (req.session.token) {
      const payload = await verify(req.session.token, 'our token')
      const user = await db.User.findOne({ where: { email: payload.user.email } })

      if (user) {
        return next()
      } else {
        return res.redirect('/')
      }
    }

    res.redirect('/')
  } catch (err) {
    next(err)
  }
}

export const doNotAccessIfNotAdmin = async (req, res, next) => {
  try {
    if (req.session.token) {
      const payload = await verify(req.session.token, 'our secret')
      const user = await db.User.findOne({ where: { email: payload.user.email } })

      if (user && user.userAdmin) {
        return next()
      } else {
        return res.redirect('/')
      }
    }

    res.redirect('/')
  } catch (err) {
    next(err)
  }
}
