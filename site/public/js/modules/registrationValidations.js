export const validateRegistration = () => {
  const form = document.getElementById('registration')

  form.onsubmit = event => {

    // Atrapa controles a validar
    const firstName = document.getElementById('nombre')
    const lastName = document.getElementById('apellido')
    const email = document.getElementById('email')
    const password = document.getElementById('password')
    const passwordRepeat = document.getElementById('repetirPassword')

    // Validación Nombre
    const firstNameMsg = document.getElementById('msjNombre')
    if (firstName.value === '') {
      event.preventDefault()
      firstName.classList.add('is-invalid')
      firstNameMsg.classList.remove('d-none')
    } else {
      firstNameMsg.classList.add('d-none')
      firstName.classList.remove('is-invalid')
    }

    // Validación Apellido
    const lastNameMsg = document.getElementById('msjApellido')
    if (lastName.value === '') {
      event.preventDefault()
      lastName.classList.add('is-invalid')
      lastNameMsg.classList.remove('d-none')
    } else {
      lastNameMsg.classList.add('d-none')
      lastName.classList.remove('is-invalid')
    }

    // Validación Email
    const emailMsg = document.getElementById('msjEmail')
    if (email.value === '') {
      event.preventDefault()
      email.classList.add('is-invalid')
      emailMsg.classList.remove('d-none')
    } else {
      emailMsg.classList.add('d-none')
      email.classList.remove('is-invalid')
    }

    /*Esta evaluación no esta funcionando correctamente
    if (! /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3,4})+$/g.test(email.value)){
      errores.push('La dirección de email es incorrecta.')
    }*/

    // Validación Password
    const passwordMsg = document.getElementById('msjPassword')
    if (password.value === '' || password.value.length < 6) {
      event.preventDefault()
      password.classList.add('is-invalid')
      passwordMsg.classList.remove('d-none')
    } else {
      passwordMsg.classList.add('d-none')
      password.classList.remove('is-invalid')
    }

    // Validación repetir password
    const passwordRepeatMsg = document.getElementById('msjRepetirPassword')
    if (password.value != passwordRepeat.value) {
      event.preventDefault()
      passwordRepeat.classList.add('is-invalid')
      passwordRepeatMsg.classList.remove('d-none')
    } else {
      passwordRepeatMsg.classList.add('d-none')
      passwordRepeat.classList.remove('is-invalid')
    }
  }
}
