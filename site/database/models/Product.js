module.exports = (sequelize, dataTypes) => {
  const Product = sequelize.define('Product', {
    id: {
      type: dataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: dataTypes.STRING(150),
    precio: dataTypes.DOUBLE,
    descuento: dataTypes.DOUBLE,
    categoriaProducto_id: dataTypes.INTEGER(11),
    descripcion: dataTypes.STRING(400),
    imagen: dataTypes.STRING(100),
    status_id: dataTypes.INTEGER(11)
  }, {
    timestamps: false,
    tableName: 'productos'
  })

  Product.associate = models => {
    Product.hasMany(models.saleDetail, {
      as: 'saleDetails',
      foreignKey: 'producto_id'
    })

    Product.belongsTo(models.ProductCategory, {
      as: 'category',
      foreignKey: 'categoriaProducto_id'
    })

    Product.belongsTo(models.ProductStatus, {
      as: 'status',
      foreignKey: 'status_id'
    })
  }

  return Product
}
