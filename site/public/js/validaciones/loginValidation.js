export const validaLogin = () => {
  const formulario = document.getElementById('login')

  formulario.onsubmit = e => {
    const email = document.getElementById('email-login')
    const password  = document.getElementById('password-login')

    //Validación Email
    const msjEmail = document.getElementById('msjEmail-login')
    if(email.value == ''){
      e.preventDefault()
      email.classList.add('is-invalid')
      msjEmail.classList.remove('d-none')
    }
    else{
      msjEmail.classList.add('d-none')
      email.classList.remove('is-invalid')
    }

    //Validación Password
    const msjPasw = document.getElementById('msjpassword-login')
    if(password.value == '' || password.value.length < 6){
      e.preventDefault()
      password.classList.add('is-invalid')
      msjPasw.classList.remove('d-none')
    }
    else{
      msjPasw.classList.add('d-none')
      password.classList.remove('is-invalid')
    }

  }
}
