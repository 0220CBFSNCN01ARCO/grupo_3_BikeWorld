import { join } from 'path'


export const showCart = (req, res) => res.render('cart', {items: [
  {name:"Venzo Skyline 27 v", price:38791, image:"image-1592795665963.jpg",
  description:"Venzo Skyline de 27 velocidades, frenos hidráulicos y suspensión a elastómeros."},
  {name:"Casco", price:1576, image:"image-1592795275916.jpg",
  description:"Casco para uso recreativo ajustable."},
  {name:"Medidor de cadena", price:356, image:"image-1592795357323.jpg",
  description:"Medidor de desgaste de cadena en 1 y 0.75."},
  {name:"Piñón 12 velocidades", price:3245, image:"image-1592795451650.jpg",
  description:"Piñón de 12 velocidades 11 / 46, cuerpo de aluminio, ligero en peso."}],
  getProductImagePath: imageFileName => join("/images/products", imageFileName)
})
