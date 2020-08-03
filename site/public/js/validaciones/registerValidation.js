window.onload = () => {
  const formulario = document.getElementById('registration')

  formulario.onsubmit = () => {

    /*El código comentado corresponde al manejo de errores como fué visto en el curso. El manejo de
    errores propuesto por Nahuel, a travez de Boostrap se tomó por ser óptimo y esteticamente mas
    agradable al código comentado faltan las sentencias para limpiar la sección de errores*/

    //const errores = []

    //Atrapa controles a validar
    const nombre = document.getElementById('nombre')
    const apellido = document.getElementById('apellido')
    const email = document.getElementById('email')
    const password  = document.getElementById('password')
    const repetirPassword  = document.getElementById('repetirPassword')

    //Validación Nombre
    const msjNom = document.getElementById('msjNombre')
    if(nombre.value == ''){
      //errores.push('El campo nombre no puede ser vacio')
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
      //errores.push('El campo apellido no puede ser vacio')
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
      //errores.push('El campo email no puede ser vacio')
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
      //errores.push('Debe repetir su password')
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
      //errores.push('El campo password no puede ser vacio')
      repetirPassword.classList.add('is-invalid')
      msjRepPasw.classList.remove('d-none')
    }
    else{
      msjRepPasw.classList.add('d-none')
      repetirPassword.classList.remove('is-invalid')
    }

    /*if (errores.length > 0){
      e.preventDefault()
      const listaErrores = document.getElementById('listaErrores')
      for(let i = 0; i < errores.length; i++ ){
        listaErrores.innerHTML += '<li>' + errores[i] + '</li>'
      }
    }*/
  }
}
