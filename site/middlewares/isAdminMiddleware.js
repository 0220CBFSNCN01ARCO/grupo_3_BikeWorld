import { verify as _verify } from 'jsonwebtoken'
import { promisify } from 'util'
import db from '../database/models'

const verify = promisify(_verify)

export const isLogged = async (req, res, next) => {
  try {
    if (req.logged) {
      const payload = await verify(req.session.token, 'our secret')
      const user = await db.User.findOne({ where: { email: payload.user.email } })
      req.admin = user && user.userAdmin
      next()
    }

    next()
  } catch (err) {
    next(err)
  }
}
