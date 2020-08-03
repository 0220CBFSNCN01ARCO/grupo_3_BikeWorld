const validaLogin = () => {
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
const validaRegister = () => {
  const formulario = document.getElementById('registration')

  formulario.onsubmit = e => {

    //Atrapa controles a validar
    const nombre = document.getElementById('nombre')
    const apellido = document.getElementById('apellido')
    const email = document.getElementById('email')
    const password  = document.getElementById('password')
    const repetirPassword  = document.getElementById('repetirPassword')

    //Validación Nombre
    const msjNom = document.getElementById('msjNombre')
    if(nombre.value === ''){
      e.preventDefault()
      nombre.classList.add('is-invalid')
      msjNom.classList.remove('d-none')
    }
    else{
      msjNom.classList.add('d-none')
      nombre.classList.remove('is-invalid')
    }

    //Validación Apellido
    const msjApe = document.getElementById('msjApellido')
    if(apellido.value == ''){
      e.preventDefault()
      apellido.classList.add('is-invalid')
      msjApe.classList.remove('d-none')
    }
    else{
      msjApe.classList.add('d-none')
      apellido.classList.remove('is-invalid')
    }

    //Validación Email
    const msjEmail = document.getElementById('msjEmail')
    if(email.value == ''){
      e.preventDefault()
      email.classList.add('is-invalid')
      msjEmail.classList.remove('d-none')
    }
    else{
      msjEmail.classList.add('d-none')
      email.classList.remove('is-invalid')
    }

    /*Esta evaluación no esta funcionando correctamente
    if (! /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3,4})+$/g.test(email.value)){
      errores.push('La dirección de email es incorrecta.')
    }*/

    //Validación Password
    const msjPasw = document.getElementById('msjPassword')
    if(password.value == '' || password.value.length < 6){
      e.preventDefault()
      password.classList.add('is-invalid')
      msjPasw.classList.remove('d-none')
    }
    else{
      msjPasw.classList.add('d-none')
      password.classList.remove('is-invalid')
    }

    //Validación repetir password
    const msjRepPasw = document.getElementById('msjRepetirPassword')
    if(password.value != repetirPassword.value){
      e.preventDefault()
      repetirPassword.classList.add('is-invalid')
      msjRepPasw.classList.remove('d-none')
    }
    else{
      msjRepPasw.classList.add('d-none')
      repetirPassword.classList.remove('is-invalid')
    }
  }
}

window.onload = () => {
 validaLogin();
 validaRegister();
}
