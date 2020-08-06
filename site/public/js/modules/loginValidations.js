export const validateLogin = () => {
  const form = document.getElementById('login')

  form.onsubmit = event => {
    const email = document.getElementById('email-login')
    const password  = document.getElementById('password-login')

    // Validación Email
    const emailMsg = document.getElementById('msjEmail-login')
    if (email.value === '') {
      event.preventDefault()
      email.classList.add('is-invalid')
      emailMsg.classList.remove('d-none')
    } else {
      emailMsg.classList.add('d-none')
      email.classList.remove('is-invalid')
    }

    // Validación Password
    const passwordMsg = document.getElementById('msjpassword-login')
    if (password.value === '' || password.value.length < 6) {
      event.preventDefault()
      password.classList.add('is-invalid')
      passwordMsg.classList.remove('d-none')
    } else {
      passwordMsg.classList.add('d-none')
      password.classList.remove('is-invalid')
    }
  }
}
