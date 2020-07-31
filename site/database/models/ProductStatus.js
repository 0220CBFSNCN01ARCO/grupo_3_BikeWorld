export default (sequelize, dataTypes) => {
  const ProductStatus = sequelize.define('ProductStatus', {
    id: {
      type: dataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: dataTypes.STRING(100)
  }, {
    timestamps: false,
    tableName: 'ProductStates'
  })

  ProductStatus.associate = models => {
    ProductStatus.hasMany(models.Product, {
      as: 'products',
      foreignKey: 'productStatusId'
    })
  }

  return ProductStatus
}
