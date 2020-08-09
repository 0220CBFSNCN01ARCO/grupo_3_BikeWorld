window.onload = () => {
  const btnEditar=document.getElementById('btnEditar')
  btnEditar.addEventListener('onclick',()=>{
    const nombre = document.getElementById('nombre')
    nombre.classList.remove('disable')
  },false)
}
