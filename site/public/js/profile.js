window.onload = () => {
  const editButton = document.getElementById('editButton')

  editButton.onclick = event => {
    const firstName = document.getElementById('firstName-register')
    const lastName = document.getElementById('lastName-register')
    const email = document.getElementById('email-register')
    const password = document.getElementById('password-register')
    const passwordRepeat = document.getElementById('passwordRepeat-register')

    const cambiarEstadoControl = () => {
      editButton.innerText = 'Guardar'
      firstName.removeAttribute('disabled')
      lastName.removeAttribute('disabled')
      email.removeAttribute('disabled')
      password.removeAttribute('disabled')
      passwordRepeat.removeAttribute('disabled')
    }

    if (editButton.innerText === 'Editar') {
      event.preventDefault()
      cambiarEstadoControl();
    }
  }
}
