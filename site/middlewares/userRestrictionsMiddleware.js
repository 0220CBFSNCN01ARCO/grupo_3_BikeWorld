export const doNotAccessIfLoggedIn = async (req, res, next) => {
  if (req.logged) {
    return res.redirect('/')
  }

  next()
}

export const doNotAccessIfNotLoggedIn = async (req, res, next) => {
  if (req.logged) {
    return next()
  }

  res.redirect('/')
}

export const doNotAccessIfNotAdmin = (req, res, next) => {
  if (req.logged && req.admin) {
    return next()
  }

  res.redirect('/')
}
