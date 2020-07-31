import db from '../database/models'
import createHttpError from 'http-errors'

export const showRegistrationForm = (req, res) => res.render('registrationForm')

export const createUser = async (req, res) => {
  try {
    const userCategory = await db.UserCategory.findByPk(1)

    await db.User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      userCategoryId: userCategory.id,
      image: req.file.filename
    })

    res.redirect('/')
  } catch (err) {
    createHttpError(500)
    console.error(err)
  }
}

export const editUser = async (req, res) => {
  try {
    const userCategory = db.UserCategory.findByPk(1)

    await db.User.update({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      userCategoryId: userCategory.id
    }, { where: req.params.id })

    if (req.file) {
      await db.User.update({ image: req.file.filename }, { where: req.params.id })
    }

    res.redirect('/')
  } catch (err) {
    createHttpError(500)
    console.error(err)
  }
}

export const showUserDetails = async (req, res) => {
  try {
    res.render('userDetails', {
      user: await db.User.findByPk(req.params.id, {
        include: [
          { association: 'category' }
        ]
      })
    })
  } catch (err) {
    createHttpError(500)
    console.error(err)
  }
}
