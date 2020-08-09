import { verify as _verify } from 'jsonwebtoken'
import { promisify } from 'util'
import db from '../database/models'

const verify = promisify(_verify)

export const remindMe = async (req, res, next) => {
  if (req.cookies.token && !req.session.token) {
    try {
      const payload = await verify(req.cookies.token, 'our secret')
      const user = await db.User.findOne({ where: { email: payload.user.email } })

      if (!user) {
        next()
      }

      req.session.token = req.cookies.token

      next()
    } catch (err) {
      next(err)
    }
  } else {
    next()
  }
}
