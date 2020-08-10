/* eslint-disable no-undef */
window.onload = () => {
  const form = document.getElementById('productForm')

  form.onsubmit = event => {
    const name = document.getElementById('inputName')
    const nameMsg = document.getElementById('msjInputName')
    const price = document.getElementById('inputPrice')
    const priceMsg = document.getElementById('msjInputPrice')
    const discount = document.getElementById('inputDiscount')
    const discountMsg = document.getElementById('msjInputDiscount')
    const category = document.getElementById('inputCategory')
    const categoryMsg = document.getElementById('msjInputCategory')
    const description = document.getElementById('inputDescription')
    const descriptionMsg = document.getElementById('msjInputDescription')
    const status = document.getElementById('inputStatus')
    const statusMsg = document.getElementById('msjInputStatus')
    const image = document.getElementById('inputImage')
    const imageMsg = document.getElementById('msjInputImage')

    if (name.value === '') {
      event.preventDefault()
      name.classList.add('is-invalid')
      nameMsg.innerText = 'Ingrese un nombre'
    } else if (!validator.isLength(validator.trim(name.value), { min: 5 })) {
      event.preventDefault()
      name.classList.add('is-invalid')
      nameMsg.innerText = 'El nombre debe tener al menos 5 caracteres de largo'
    } else {
      name.classList.remove('is-invalid')
    }

    if (price.value === '' || price.value === '0') {
      event.preventDefault()
      price.classList.add('is-invalid')
      priceMsg.innerText = 'Ingrese un precio'
    } else if (!validator.isNumeric(price.value)) {
      event.preventDefault()
      price.classList.add('is-invalid')
      priceMsg.innerText = 'El precio debe ser un número'
    } else {
      price.classList.remove('is-invalid')
    }

    if (!validator.isNumeric(discount.value)) {
      event.preventDefault()
      discount.classList.add('is-invalid')
      discountMsg.innerText = 'El descuento debe ser un número'
    } else if (validator.toFloat(discount.value) > 100) {
      event.preventDefault()
      discount.classList.add('is-invalid')
      discountMsg.innerText = 'El descuento no puede ser más del 100%'
    } else {
      discount.classList.remove('is-invalid')
    }

    if (category.value === '') {
      event.preventDefault()
      category.classList.add('is-invalid')
      categoryMsg.innerText = 'Ingrese una categoría'
    } else {
      category.classList.remove('is-invalid')
    }

    if (description.value !== '' && !validator.isLength(description.value, { min: 20 })) {
      event.preventDefault()
      description.classList.add('is-invalid')
      descriptionMsg.innerText = 'La descripción debe tener al menos 20 caracteres'
    } else {
      description.classList.remove('is-invalid')
    }

    if (status.value === '') {
      event.preventDefault()
      status.classList.add('is-invalid')
      statusMsg.innerText = 'Ingrese un estado'
    } else {
      status.classList.remove('is-invalid')
    }

    if (form.getAttribute('action') === '/products') {
      if (image.files.length === 0) {
        event.preventDefault()
        imageMsg.classList.add('d-block')
        imageMsg.innerText = 'Seleccione una imagen para el producto'
      } else if (image.files.length !== 1) {
        event.preventDefault()
        imageMsg.classList.add('d-block')
        imageMsg.innerText = 'Seleccione solo una imagen'
      } else if (!validator.isIn(image.files[0].type, ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'])) {
        event.preventDefault()
        imageMsg.classList.add('d-block')
        imageMsg.innerText = 'La imagen seleccionada no es válida'
      } else {
        imageMsg.classList.remove('d-block')
      }
    }
  }
}
