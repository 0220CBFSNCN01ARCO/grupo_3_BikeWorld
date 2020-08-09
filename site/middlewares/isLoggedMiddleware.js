export const isLogged = (req, res, next) => {
  req.logged = req.session.token ? true : false
  next()
}
