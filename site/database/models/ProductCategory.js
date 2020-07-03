module.exports = (sequelize, dataTypes) => {
  const ProductCategory = sequelize.define('ProductCategory', {
    id: {
      type: dataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: dataTypes.STRING(100)
  }, {
    timestamps: false,
    tableName: 'categoriaproductos'
  })

  ProductCategory.associate = models => {
    ProductCategory.hasMany(models.Product, {
      as: 'products',
      foreignKey: 'categoriaProducto_id'
    })
  }

  return ProductCategory
}
