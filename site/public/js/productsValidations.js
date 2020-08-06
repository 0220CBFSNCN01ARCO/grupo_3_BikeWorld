window.onload = () => {
  const form = document.getElementById('product')

  form.onsubmit = event => {

    // Atrapa controles a validar
    const name = document.getElementById('inputName')
    const price = document.getElementById('inputPrice')
    const category = document.getElementById('inputCategory')
    const description = document.getElementById('inputDescription')
    const status = document.getElementById('inputStatus')

    // Validación Nombre
    const nameMsg = document.getElementById('msjInputName')
    if (name.value === '') {
      event.preventDefault()
      name.classList.add('is-invalid')
      nameMsg.classList.remove('d-none')
    } else {
      nameMsg.classList.add('d-none')
      name.classList.remove('is-invalid')
    }

    // Validación Precio
    const priceMsg = document.getElementById('msjInputPrice')
    if (price.value === '') {
      event.preventDefault()
      price.classList.add('is-invalid')
      priceMsg.classList.remove('d-none')
    } else {
      priceMsg.classList.add('d-none')
      price.classList.remove('is-invalid')
    }

    // Validación Categoria
    const categoryMsg = document.getElementById('msjInputCategory')
    if (category.value === '') {
      event.preventDefault()
      category.classList.add('is-invalid')
      categoryMsg.classList.remove('d-none')
    } else {
      categoryMsg.classList.add('d-none')
      category.classList.remove('is-invalid')
    }

    // Validación Descripcion
    const descriptionMsg = document.getElementById('msjInputDescription')
    if (description.value === '') {
      event.preventDefault()
      description.classList.add('is-invalid')
      descriptionMsg.classList.remove('d-none')
    } else {
      descriptionMsg.classList.add('d-none')
      description.classList.remove('is-invalid')
    }

    // Validación Status
    const statusMsg = document.getElementById('msjInputStatus')
    if (status.value === '') {
      event.preventDefault()
      status.classList.add('is-invalid')
      statusMsg.classList.remove('d-none')
    } else {
      statusMsg.classList.add('d-none')
      status.classList.remove('is-invalid')
    }
  }
}
