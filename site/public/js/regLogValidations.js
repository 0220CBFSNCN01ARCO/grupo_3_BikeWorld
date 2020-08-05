import { validateRegistration } from './modules/registrationValidations.js'
import { validateLogin } from './modules/loginValidations.js'

window.onload = () => {
  validateRegistration()
  validateLogin()
}
