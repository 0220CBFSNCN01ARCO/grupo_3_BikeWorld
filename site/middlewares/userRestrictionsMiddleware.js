export const doNotAccessIfLoggedIn = async (req, res, next) => {
  if (req.logged) {
    res.redirect('/')
  }

  next()
}

export const doNotAccessIfNotLoggedIn = async (req, res, next) => {
  if (req.logged) {
    return next()
  }

  res.redirect('/')
}

export const doNotAccessIfNotAdmin = async (req, res, next) => {
  try {
    if (req.logged && req.admin) {
      return next()
    }

    res.redirect('/')
  } catch (err) {
    next(err)
  }
}
