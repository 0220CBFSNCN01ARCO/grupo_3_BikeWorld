const valida = () => {
  const formulario = document.getElementById('product')

  formulario.onsubmit = e => {

    //Atrapa controles a validar
    const nombre = document.getElementById('inputName')
    const precio = document.getElementById('inputPrice')
    const categoria = document.getElementById('inputCategory')
    const descripcion  = document.getElementById('inputDescription')
    const status  = document.getElementById('inputStatus')

    //Validación Nombre
    const msjNom = document.getElementById('msjInputName')
    if(nombre.value === ''){
      e.preventDefault()
      nombre.classList.add('is-invalid')
      msjNom.classList.remove('d-none')
    }
    else{
      msjNom.classList.add('d-none')
      nombre.classList.remove('is-invalid')
    }

    //Validación Precio
    const msjPrecio = document.getElementById('msjInputPrice')
    if(precio.value === ''){
      e.preventDefault()
      precio.classList.add('is-invalid')
      msjPrecio.classList.remove('d-none')
    }
    else{
      msjPrecio.classList.add('d-none')
      precio.classList.remove('is-invalid')
    }

    //Validación Categoria
    const msjCategoria = document.getElementById('msjInputCategory')
    if(categoria.value === ''){
      e.preventDefault()
      categoria.classList.add('is-invalid')
      msjCategoria.classList.remove('d-none')
    }
    else{
      msjCategoria.classList.add('d-none')
      categoria.classList.remove('is-invalid')
    }

    //Validación Descripcion
    const msjDescripcion = document.getElementById('msjInputDescription')
    if(descripcion.value === ''){
      e.preventDefault()
      descripcion.classList.add('is-invalid')
      msjDescripcion.classList.remove('d-none')
    }
    else{
      msjDescripcion.classList.add('d-none')
      descripcion.classList.remove('is-invalid')
    }

    //Validación Status
    const msjStatus = document.getElementById('msjInputStatus')
    if(status.value === ''){
      e.preventDefault()
      status.classList.add('is-invalid')
      msjStatus.classList.remove('d-none')
    }
    else{
      msjStatus.classList.add('d-none')
      status.classList.remove('is-invalid')
    }
  }
}

window.onload = () => {
  valida()
}
