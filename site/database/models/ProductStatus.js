module.exports = (sequelize, dataTypes) => {
  const ProductStatus = sequelize.define('ProductStatus', {
    id: {
      type: dataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: dataTypes.STRING(100)
  }, {
    timestamps: false,
    tableName: 'statusproducto'
  })

  ProductStatus.associate = models => {
    ProductStatus.hasMany(models.Product, {
      as: 'products',
      foreignKey: 'status_id'
    })
  }

  return ProductStatus
}
