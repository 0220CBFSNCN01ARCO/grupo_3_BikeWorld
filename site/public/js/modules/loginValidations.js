export const validateLogin = () => {
  const loginForm = document.getElementById('loginForm')

  loginForm.onsubmit = event => {
    const email = document.getElementById('email-login')
    const emailMsg = document.getElementById('msjEmail-login')
    const password = document.getElementById('password-login')
    const passwordMsg = document.getElementById('msjPassword-login')

    if (email.value === '') {
      event.preventDefault()
      email.classList.add('is-invalid')
      emailMsg.innerText = 'Ingrese un email'
    } else if (!validator.isEmail(email.value)) {
      event.preventDefault()
      email.classList.add('is-invalid')
      emailMsg.innerText = 'El email ingresado no es válido'
    } else {
      email.classList.remove('is-invalid')
    }

    if (password.value === '') {
      event.preventDefault()
      password.classList.add('is-invalid')
      passwordMsg.innerText = 'Ingrese una contraseña'
    } else {
      password.classList.remove('is-invalid')
    }
  }
}
