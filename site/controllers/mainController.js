const fs = require ('fs')
const toThousand = n => n.toString ().replace (/\B(?=(\d{3})+(?!\d))/g, ',')

const mainController = {
    index: function (req, res) {
        return res.redirect ('/home')
    },
    home: function (req, res){
        const ofertas = obtenerOfertas ()
        const destacados = obtenerDestacados ()

        return res.render ('home', {
            title: 'Home',
            ofertas: ofertas,
            destacados: destacados,
            llevarAMil: toThousand
        })
    }
}

const obtenerOfertas = () => {
    let articulos = JSON.parse (fs.readFileSync ('site/src/data/products.json'))
    let articulosFiltrados = []

    articulos.forEach (articulo => {
        if (articulo.status === 'oferta') {
            articulosFiltrados.push (articulo)
        }
    })

    return articulosFiltrados
}

const obtenerDestacados = () => {
    let articulos = JSON.parse (fs.readFileSync ('site/src/data/products.json'))
    let articulosFiltrados = []

    articulos.forEach(articulo => {
        if(articulo.status === 'destacado') {
            articulosFiltrados.push (articulo)
        }
    })
    return articulosFiltrados
    /*return JSON.parse(fs.readFileSync('src/data/destacados.json'));*/
}
module.exports = mainController
