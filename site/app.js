import express, { json, urlencoded, static as _static } from 'express'
import { join } from 'path'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import methodOverride from 'method-override'
import { indexRouter } from './routes/index'
import { productsRouter } from './routes/products'
import { usersRouter } from './routes/users'
import { cartRouter } from './routes/cart'
import createHttpError from 'http-errors'

const app = express()

// Configuramos el motor de vistas
app.set('views', join(__dirname, 'views'))
app.set('view engine', 'ejs')

// Configuramos los middlewares globales
app.use(morgan('dev'))
app.use(json())
app.use(urlencoded({ extended: false }))
app.use(cookieParser())
app.use(_static(join(__dirname, 'public')))
app.use(methodOverride('_method'))

// Configuramos los enrutadores
app.use('/', indexRouter)
app.use('/products', productsRouter)
app.use('/users', usersRouter)
app.use('/cart', cartRouter)

// Cualquier solicitud no existente la atrapamos y la mandamos
// al manejador de errores como un 404
app.use((req, res, next) => next(createHttpError(404)))

// Configuramos el manejador de errores
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // Establecemos las variables locales y solo enviamos el error
  // si estamos en dev
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // Renderizamos la página de error
  res.status(err.status || 500)

  err.status === 404 ? res.render('404') : res.render('error')
})

export default app
