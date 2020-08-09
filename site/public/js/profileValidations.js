const validateProfile = () => {
  const registrationForm = document.getElementById('userProfileFrom')

  registrationForm.onsubmit = event => {
    const firstName = document.getElementById('firstName-register')
    const firstNameMsg = document.getElementById('msjFirstName-register')
    const lastName = document.getElementById('lastName-register')
    const lastNameMsg = document.getElementById('msjLastName-register')
    const email = document.getElementById('email-register')
    const emailMsg = document.getElementById('msjEmail-register')
    const password = document.getElementById('password-register')
    const passwordMsg = document.getElementById('msjPassword-register')
    const passwordRepeat = document.getElementById('passwordRepeat-register')
    const passwordRepeatMsg = document.getElementById('msjPasswordRepeat-register')

    if (firstName.value === '') {
      event.preventDefault()
      firstName.classList.add('is-invalid')
      firstNameMsg.innerText = 'Ingrese un nombre'
    } else if (!validator.isLength(validator.trim(firstName.value), { min: 2 })) {
      event.preventDefault()
      firstName.classList.add('is-invalid')
      firstNameMsg.innerText = 'El nombre debe tener al menos 2 caracteres'
    } else {
      firstName.classList.remove('is-invalid')
    }

    if (lastName.value === '') {
      event.preventDefault()
      lastName.classList.add('is-invalid')
      lastNameMsg.innerText = 'Ingrese un apellido'
    } else if (!validator.isLength(validator.trim(lastNameMsg.value), { min: 2 })) {
      event.preventDefault()
      lastName.classList.add('is-invalid')
      lastNameMsg.innerText = 'El apellido debe tener al menos 2 caracteres'
    } else {
      lastName.classList.remove('is-invalid')
    }

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

    /* Evalua solo la password si esta tiene un valor */
    if (password.value !== '') {
      if (!validator.isLength(password.value, { min: 8 })) {
        event.preventDefault()
        password.classList.add('is-invalid')
        passwordMsg.innerText = 'La contraseña debe tener al menos 8 caracteres'
      } else if (!validator.matches(password.value, /[A-Z]/)) {
        event.preventDefault()
        password.classList.add('is-invalid')
        passwordMsg.innerText = 'La contraseña debe tener al menos 1 letra mayúscula'
      } else if (!validator.matches(password.value, /[a-z]/)) {
        event.preventDefault()
        password.classList.add('is-invalid')
        passwordMsg.innerText = 'La contraseña debe tener al menos 1 letra minúscula'
      } else if (!validator.matches(password.value, /\d/)) {
        event.preventDefault()
        password.classList.add('is-invalid')
        passwordMsg.innerText = 'La contraseña debe tener al menos 1 número'
      } else {
        password.classList.remove('is-invalid')
      }

      if (passwordRepeat.value === '') {
        event.preventDefault()
        passwordRepeat.classList.add('is-invalid')
        passwordRepeatMsg.innerText = 'Repita la contraseña'
      } else if (passwordRepeat.value !== password.value) {
        event.preventDefault()
        passwordRepeat.classList.add('is-invalid')
        passwordRepeatMsg.innerText = 'Las contraseñas no coinciden'
      } else {
        passwordRepeat.classList.remove('is-invalid')
      }
    }
  }
}

window.onload = () => {
  validateProfile();
}
